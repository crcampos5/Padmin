<?php

namespace app\controllers;

use Yii;
use app\models\Proveedor;
use yii\rest\ActiveController;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;

class ProveedorController extends ActiveController {

    // adjust the model class to match your model
    public $modelClass = 'app\models\Proveedor';

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

    public function actionSearch() {
        $request = Yii::$app->request;
        $resul = Proveedor::search($request->get('val'));
        return $resul;
    }
    public function actionListpro(){
        return Proveedor::find()->all();
    }

}
