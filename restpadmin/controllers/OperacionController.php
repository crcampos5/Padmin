<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;
use yii\data\ActiveDataProvider;
use app\models\Operacion;

class OperacionController extends ActiveController {

    // adjust the model class to match your model
    public $modelClass = 'app\models\Operacion';

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

    public function actions() {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        return $actions;
    }

    public function prepareDataProvider() {
        return new ActiveDataProvider([
            'query' => Operacion::find(),
            'sort' => [
                'defaultOrder' => [
                    'id' => SORT_DESC
                ]
            ]
        ]);
    }

    public function actionSaldo() {
        $models = Operacion::find()
                ->all();
        $ingreso = 0;
        $egreso = 0;
        foreach ($models as $item) {
            $ingreso += $item->ingreso;
            $egreso += $item->egreso;
        }
        return $ingreso - $egreso;
    }

    public function actionSearch() {
        $request = Yii::$app->request;
        $query = Operacion::find()
                ->where(['like', 'operacion', $request->get('val')]);
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
