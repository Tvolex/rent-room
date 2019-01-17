<template>
    <v-layout row wrap main-items class="space-for-login">
        <v-flex xs10 offset-xs1 md6 offset-md3 lg4 offset-lg4>
            <v-hover>
                <v-card slot-scope="{ hover }" class="card-login">
                    <v-card-title><h2>Login</h2></v-card-title>
                    <v-form v-model="isFormValid" name="authForm">
                        <v-layout>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        prepend-icon="person"
                                        name="email"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="password"
                                        :rules="passwordRules"
                                        type="password"
                                        label="Пароль"
                                        prepend-icon="lock"
                                        name="password"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex xs12>
                                <v-btn
                                        large
                                        round
                                        :loading="loading"
                                        :disabled="!isFormValid || loading"
                                        color="success"
                                        @click.native="Login">
                                    Вхід
                                    <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                    <router-link to="/register">Register</router-link>
                </v-card>
            </v-hover>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                isFormValid: false,
                loading: false,
                email: null,
                password: null,
                passwordRules: [
                    v => !!v || 'Пароль обов`язковий!'
                ],
                emailRules: [
                    v => !!v || 'E-mail обов`язковий!',
                    v => /.+@.+/.test(v) || 'E-mail повинен бути валідним!'
                ],
            }
        },
    }
</script>

<style scoped>
    .space-for-login {
        min-height: 79.91vh;
    }

    .card-login {
        margin-top: 20vh;
        padding: 40px;
    }
</style>
