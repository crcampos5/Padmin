<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "venta".
 *
 * @property integer $id
 * @property string $fecha
 * @property integer $base
 * @property integer $total_gastos
 * @property integer $efectivo_recogido
 * @property integer $efectivo_restante
 * @property integer $venta
 * @property integer $operacion_id
 *
 * @property Operacion $operacion
 */
class Venta extends \yii\db\ActiveRecord {

    /**
     * @inheritdoc
     */
    public static function tableName() {
        return 'venta';
    }

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['fecha', 'operacion_id'], 'required'],
            [['fecha'], 'safe'],
            [['base', 'total_gastos', 'efectivo_recogido', 'efectivo_restante', 'venta', 'operacion_id'], 'integer'],
            [['fecha'], 'unique']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels() {
        return [
            'id' => 'ID',
            'fecha' => 'Fecha',
            'base' => 'Base',
            'total_gastos' => 'Total Gastos',
            'efectivo_recogido' => 'Efectivo Recogido',
            'efectivo_restante' => 'Efectivo Restante',
            'venta' => 'Venta',
            'operacion_id' => 'Operacion ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOperacion() {
        return $this->hasOne(Operacion::className(), ['id' => 'operacion_id']);
    }

    public static function byDate($dt) {
        return static::find()
                        ->where(['like', 'fecha', $dt])
                        ->all();
    }

}
