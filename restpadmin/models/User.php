<?php

namespace app\models;

use Yii;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "user".
 *
 * @property integer $id
 * @property string $username
 * @property string $password
 * @property string $email
 * @property string $created
 * @property integer $role
 * @property string $token
 * @property string $expirestoken
 * @property string $authkey
 * @property integer $activate
 */
class User extends \yii\db\ActiveRecord implements IdentityInterface {

    /**
     * @inheritdoc
     */
    const ROLE_USER = 10;
    const ROLE_ADMIN = 20;
    const ROLE_SUPERUSER = 30;
    const STATUS_DELETED = 0;
    const STATUS_ACTIVE = 10;

    public static function tableName() {
        return 'user';
    }

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['username', 'password', 'email', 'created'], 'required'],
            [['created', 'expirestoken'], 'safe'],
            [['role', 'activate'], 'integer'],
            [['username', 'password', 'token', 'authkey'], 'string', 'max' => 255],
            [['email'], 'string', 'max' => 80]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels() {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'password' => 'Password',
            'email' => 'Email',
            'created' => 'Created',
            'role' => 'Role',
            'token' => 'Token',
            'expirestoken' => 'Expirestoken',
            'authkey' => 'Authkey',
            'activate' => 'Activate',
        ];
    }

    public static function findByUsername($username) {
        return static::findOne(['username' => $username]);
    }

    /**
     * Finds an identity by the given ID.
     *
     * @param string|integer $id the ID to be looked for
     * @return IdentityInterface|null the identity object that matches the given ID.
     */
    public static function findIdentity($id) {
        return static::findOne($id);
    }

    /**
     * Finds an identity by the given token.
     *
     * @param string $token the token to be looked for
     * @return IdentityInterface|null the identity object that matches the given token.
     */
    public static function findIdentityByAccessToken($token, $type = null) {
        return static::findOne(['token' => $token]);
    }

  

    /**
     * @return int|string current user ID
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @return string current user auth key
     */
    public function getAuthKey() {
        return $this->authkey;
    }

    public function getToken() {
        return $this->token;
    }

    /**
     * @param string $authKey
     * @return boolean if auth key is valid for current user
     */
    public function validateAuthKey($authKey) {
        return $this->getAuthKey() === $authKey;
    }

    public function validatePassword($password) {
        return $this->password === $password;
    }

    public static function roleInArray($arr_role) {
        return in_array(Yii::$app->user->identity->role, $arr_role);
    }

    public static function isActive() {
        return Yii::$app->user->identity->status == self::STATUS_ACTIVE;
    }

    public function beforeSave($insert) {
        if (parent::beforeSave($insert)) {
            if ($this->isNewRecord) {
                $this->authkey = Yii::$app->getSecurity()->generateRandomString();
            }
            return true;
        }
        return false;
    }

}
