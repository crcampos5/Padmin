<?php

namespace app\controllers;

use Yii;
use app\models\Vale;
use yii\rest\ActiveController;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;
use yii\data\ActiveDataProvider;

class ValeController extends ActiveController {

    // adjust the model class to match your model
    public $modelClass = 'app\models\Vale';

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
            'query' => Vale::find(),
            'sort' => [
                'defaultOrder' => [
                    'id' => SORT_DESC
                ]
            ]
        ]);
    }

    public function actionBydate() {
        $request = Yii::$app->request;
        $resul = Vale::byDate($request->get('date'));
        return $resul;
    }

    public function actionSearch() {
        $request = Yii::$app->request;
        $params = $request->bodyParams;
        $query = Vale::find();
        if (isset($params['f_start']) && isset($params['f_end']))
            $query->andWhere(['between', 'fecha', $params['f_start'], $params['f_end'].' 23:59:59']);
        if (isset($params['id']))
            $query->andWhere(['empleado_id' => $params['id']]);

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
