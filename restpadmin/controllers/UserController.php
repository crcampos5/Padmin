<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;
use app\models\LoginForm;
use app\models\User;

class UserController extends ActiveController {

    public $modelClass = 'app\models\User';
    public $token = "token";

    public function behaviors() {

        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => CompositeAuth::className(),
            'authMethods' => [
                HttpBasicAuth::className(),
                HttpBearerAuth::className(),
                QueryParamAuth::className(),
            ],
            'only' => ['logout', 'signup','create','update','delete','view','index','options'],
        ];
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
        ];
        $behaviors['verbs'] = [
            'class' => \yii\filters\VerbFilter::className(),
            'actions' => [
                'login' => ['post'],
            ],
        ];
        return $behaviors;
    }

    public function actionLogin() {
        $request = Yii::$app->request;
        $params = $request->bodyParams;
        $model = User::findByUsername($params['username']);
        if ($model != null) {
            if ($model->validatePassword($params['password'])) {
                $model->token = Yii::$app->getSecurity()->generateRandomString();
                $model->update();
                $r = [
                    'username' => $model->username,
                    'email' => $model->email,
                    'role' => $model->role,
                    'access_token' => $model->getToken(),
                ];
                return $r;
            } else {
                throw new \yii\web\HttpException(401, 'Password incorrecto');
            }
        } else {
            throw new \yii\web\HttpException(401, 'Username incorrecto');
        }
    }

    public function actionLogout() {
        $request = Yii::$app->request;
        $params = $request->bodyParams;
        $model = User::findByUsername($params['username']);
        if ($model != null) {

            $model->token = null;
            $model->update();
            $r = [
                'username' => $model->username,
                'email' => $model->email,
                'role' => $model->role,
                'access_token' => $model->getToken(),
                'mensaje' => 'Se ha cerrado sesion con exito',
            ];
            return $r;
        } else {
            throw new \yii\web\HttpException(401, 'Username incorrecto');
        }
    }
    

}
