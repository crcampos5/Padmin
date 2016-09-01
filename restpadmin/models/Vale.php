<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "vale".
 *
 * @property integer $id
 * @property string $fecha
 * @property string $concepto
 * @property double $valor
 * @property integer $empleado_id
 *
 * @property Empleado $empleado
 */
class Vale extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'vale';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['fecha'], 'safe'],
            [['valor'], 'number'],
            [['empleado_id'], 'required'],
            [['empleado_id'], 'integer'],
            [['concepto'], 'string', 'max' => 100]
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
            'concepto' => 'Concepto',
            'valor' => 'Valor',
            'empleado_id' => 'Empleado ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEmpleado()
    {
        return $this->hasOne(Empleado::className(), ['id' => 'empleado_id']);
    }
     public static function byDate($dt) {
        return static::find()
                        ->where(['like', 'fecha', $dt])
                        ->all();
    }
}
