<?php
namespace app\controllers;

use Yii;
use app\models\Compra;
use yii\rest\ActiveController;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;

class CompraController extends ActiveController {

    // adjust the model class to match your model
    public $modelClass = 'app\models\Compra';

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
    
      public function actionBydate() {
        $request = Yii::$app->request;
        $resul = Compra::byDate($request->get('date'));
        return $resul;
    }
     public function actionSearch() {
        $request = Yii::$app->request;
        $params = $request->bodyParams;
        $query = null;
        if (isset($params['f_start']) && isset($params['f_end']))
             $query = Compra::find()->andWhere(['between', 'fecha', $params['f_start'], $params['f_end'].' 23:59:59'])->all();

        return $query;
    }
}

