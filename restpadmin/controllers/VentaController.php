<?php

namespace app\controllers;

use Yii;
use app\models\Venta;
use app\models\Operacion;
use yii\rest\ActiveController;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;
use yii\data\ActiveDataProvider;

class VentaController extends ActiveController {

    // adjust the model class to match your model
    public $modelClass = 'app\models\Venta';

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
        unset($actions['create']);
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        return $actions;
    }

    public function prepareDataProvider() {
        return new ActiveDataProvider([
            'query' => Venta::find(),
            'sort' => [
                'defaultOrder' => [
                    'id' => SORT_DESC
                ]
            ]
        ]);
    }

    public function actionCreate() {
        $modelVenta = new Venta;
        $modelOpe = new Operacion;

        $request = Yii::$app->request;
        $params = $request->bodyParams;
        $modelOpe->attributes = $params['operacion'];
        if ($modelOpe->save()) {
            $modelVenta->attributes = $params['venta'];
            $modelVenta->operacion_id = $modelOpe->id;
            $modelVenta->save();
        }
        return $modelVenta;
    }

    public function actionBydate() {
        $request = Yii::$app->request;
        $resul = Venta::byDate($request->get('date'));
        return $resul;
    }
    
     public function actionSearch() {
        $request = Yii::$app->request;
        $params = $request->bodyParams;
        $query = null;
        if (isset($params['f_start']) && isset($params['f_end']))
             $query = Venta::find()->andWhere(['between', 'fecha', $params['f_start'].' 00:00:00', $params['f_end'].' 23:59:59'])->all();

        return $query;
    }

}
