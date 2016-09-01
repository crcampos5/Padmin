<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "empleado".
 *
 * @property integer $id
 * @property integer $num_identificacion
 * @property string $nombre
 * @property string $apellido
 * @property integer $edad
 * @property string $fecha_nacimiento
 * @property string $direccion
 * @property string $telefono
 * @property string $cargo
 * @property integer $salario
 * @property integer $sub_transporte
 * @property string $fecha_ingreso
 * @property string $fecha_retiro
 * @property string $estado
 *
 * @property HorasExtras[] $horasExtras
 * @property Nomina[] $nominas
 * @property Vale[] $vales
 */
class Empleado extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'empleado';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['num_identificacion', 'nombre', 'apellido', 'direccion', 'telefono'], 'required'],
            [['num_identificacion', 'edad', 'salario', 'sub_transporte'], 'integer'],
            [['fecha_nacimiento', 'fecha_ingreso', 'fecha_retiro'], 'safe'],
            [['estado'], 'string'],
            [['nombre', 'apellido', 'telefono', 'cargo'], 'string', 'max' => 45],
            [['direccion'], 'string', 'max' => 60],
            [['num_identificacion'], 'unique']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'num_identificacion' => 'Num Identificacion',
            'nombre' => 'Nombre',
            'apellido' => 'Apellido',
            'edad' => 'Edad',
            'fecha_nacimiento' => 'Fecha Nacimiento',
            'direccion' => 'Direccion',
            'telefono' => 'Telefono',
            'cargo' => 'Cargo',
            'salario' => 'Salario',
            'sub_transporte' => 'Sub Transporte',
            'fecha_ingreso' => 'Fecha Ingreso',
            'fecha_retiro' => 'Fecha Retiro',
            'estado' => 'Estado',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getHorasExtras()
    {
        return $this->hasMany(HorasExtras::className(), ['empleado_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNominas()
    {
        return $this->hasMany(Nomina::className(), ['empleado_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVales()
    {
        return $this->hasMany(Vale::className(), ['empleado_id' => 'id']);
    }
}
