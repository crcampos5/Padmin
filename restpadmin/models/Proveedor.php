<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "proveedor".
 *
 * @property integer $id
 * @property string $nombre
 * @property integer $telefono
 * @property string $categoria
 *
 * @property Compra[] $compras
 */
class Proveedor extends \yii\db\ActiveRecord {

    /**
     * @inheritdoc
     */
    public static function tableName() {
        return 'proveedor';
    }

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['nombre'], 'required'],
            [['telefono'], 'integer'],
            [['categoria'], 'string'],
            [['nombre'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels() {
        return [
            'id' => 'ID',
            'nombre' => 'Nombre',
            'telefono' => 'Telefono',
            'categoria' => 'Categoria',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCompras() {
        return $this->hasMany(Compra::className(), ['proveedor_id' => 'id']);
    }

    public static function search($val) {
        return static::find()
                        ->where(['like', 'nombre', $val])
                        ->all();
    }

}
