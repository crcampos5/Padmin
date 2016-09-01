<?php

namespace app\controllers;

use Yii;
use app\models\Empleado;
use yii\rest\ActiveController;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;

class EmpleadoController extends ActiveController {

    // adjust the model class to match your model
    public $modelClass = 'app\models\Empleado';

    public function behaviors() {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => CompositeAuth::className(),
            'authMethods' => [
                HttpBasicAuth::className(),
                HttpBearerAuth::className(),
                QueryParamAuth::className(),
            ],
        ];
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
        ];
        return $behaviors;
    }

    public function actionValidate() {
        $model = new Empleado;
        $request = Yii::$app->request;
        $params = $request->bodyParams;
        $model->attributes = $params;
        if($model->validate())
            return true;
        else return $model->getErrors ();
    }

}
