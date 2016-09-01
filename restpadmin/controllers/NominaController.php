<?php

namespace app\controllers;

use Yii;
use app\models\Nomina;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;

class NominaController extends ActiveController {

    // adjust the model class to match your model
    public $modelClass = 'app\models\Nomina';

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

    public function actionByquincena() {
        $request = Yii::$app->request;
        $query = Nomina::find()->where(['mes' => $request->get('mes'), 'quincena' => $request->get('quincena')]);
        $provider = new ActiveDataProvider([
            'query' => $query,
            'sort' => [
                'defaultOrder' => [
                    'id' => SORT_DESC
                ]
            ]
        ]);
        return $provider;
    }

}
