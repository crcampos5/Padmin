<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "operacion".
 *
 * @property integer $id
 * @property string $fecha
 * @property string $operacion
 * @property double $ingreso
 * @property double $egreso
 * @property integer $edit
 *
 * @property Venta[] $ventas
 */
class Operacion extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'operacion';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['fecha', 'operacion'], 'required'],
            [['fecha'], 'safe'],
            [['ingreso', 'egreso'], 'number'],
            [['edit'], 'integer'],
            [['operacion'], 'string', 'max' => 160]
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
            'operacion' => 'Operacion',
            'ingreso' => 'Ingreso',
            'egreso' => 'Egreso',
            'edit' => 'Edit',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVentas()
    {
        return $this->hasMany(Venta::className(), ['operacion_id' => 'id']);
    }
    
     public static function search($val) {
        return static::find()
                        ->where(['like', 'operacion', $val])
                        ->all();
    }
}
