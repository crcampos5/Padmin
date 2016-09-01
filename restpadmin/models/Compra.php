<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "compra".
 *
 * @property integer $id
 * @property string $fecha
 * @property integer $valor
 * @property integer $proveedor_id
 *
 * @property Proveedor $proveedor
 */
class Compra extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'compra';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['fecha', 'valor', 'proveedor_id'], 'required'],
            [['fecha'], 'safe'],
            [['valor', 'proveedor_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'fecha' => 'Fecha',
            'valor' => 'Valor',
            'proveedor_id' => 'Proveedor ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getProveedor()
    {
        return $this->hasOne(Proveedor::className(), ['id' => 'proveedor_id']);
    }
    
     public static function byDate($dt) {
        return static::find()
                        ->where(['like', 'fecha', $dt])
                        ->all();
    }
}
