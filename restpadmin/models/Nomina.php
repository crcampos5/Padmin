<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "nomina".
 *
 * @property integer $id
 * @property string $fecha_generado
 * @property integer $dias_liquidados
 * @property integer $basico
 * @property integer $sub_transporte
 * @property integer $total_extras
 * @property integer $total_devengado
 * @property integer $salud
 * @property integer $pension
 * @property integer $total_vales
 * @property integer $otras_deducciones
 * @property integer $total_deducciones
 * @property integer $neto_pagado
 * @property string $fecha_pago
 * @property string $mes
 * @property string $quincena
 * @property integer $empleado_id
 *
 * @property Empleado $empleado
 */
class Nomina extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'nomina';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['fecha_generado', 'dias_liquidados', 'empleado_id'], 'required'],
            [['fecha_generado', 'fecha_pago'], 'safe'],
            [['dias_liquidados', 'basico', 'sub_transporte', 'total_extras', 'total_devengado', 'salud', 'pension', 'total_vales', 'otras_deducciones', 'total_deducciones', 'neto_pagado', 'empleado_id'], 'integer'],
            [['quincena'], 'string'],
            [['mes'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'fecha_generado' => 'Fecha Generado',
            'dias_liquidados' => 'Dias Liquidados',
            'basico' => 'Basico',
            'sub_transporte' => 'Sub Transporte',
            'total_extras' => 'Total Extras',
            'total_devengado' => 'Total Devengado',
            'salud' => 'Salud',
            'pension' => 'Pension',
            'total_vales' => 'Total Vales',
            'otras_deducciones' => 'Otras Deducciones',
            'total_deducciones' => 'Total Deducciones',
            'neto_pagado' => 'Neto Pagado',
            'fecha_pago' => 'Fecha Pago',
            'mes' => 'Mes',
            'quincena' => 'Quincena',
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
}
