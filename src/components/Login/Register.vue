<template>
    <v-layout row wrap main-items class="space-for-register">
        <v-flex xs10 offset-xs1 md6 offset-md3 lg4 offset-lg4>
            <v-hover>
                <v-card slot-scope="{ hover }" class="card-register">
                    <v-card-title><h2>Registration</h2></v-card-title>
                    <v-form v-model="isFormValid" ref="registerForm" name="registerForm">
                        <v-layout row wrap justify-center>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="name"
                                        :rules="nameRules"
                                        label="Name"
                                        prepend-icon="person"
                                        name="email"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="surname"
                                        :rules="surnameRules"
                                        prepend-icon="how_to_reg"
                                        label="Surname"
                                        name="surname"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        prepend-icon="email"
                                        name="email"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="contact"
                                        :rules="contactRules"
                                        label="Phone number"
                                        prepend-icon="phone"
                                        name="email"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="password"
                                        :rules="passwordRules"
                                        type="password"
                                        label="Password"
                                        prepend-icon="lock"
                                        name="password"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="confirmPassword"
                                        :rules="confirmPasswordRules"
                                        type="password"
                                        label="Confirm password"
                                        prepend-icon="lock"
                                        name="confirmPassword"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout align-center justify-center column fill-height>
                            <v-flex xs4>
                                <v-btn
                                        large
                                        round
                                        :loading="loading"
                                        :disabled="!isFormValid || loading"
                                        @click.native="Login"
                                >
                                    Save me
                                    <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                </v-btn>
                            </v-flex>
                            <v-flex xs4>
                                <router-link to="/login">Login</router-link>
                            </v-flex>
                            <v-flex xs12>
                                <v-btn flat>
                                    <input type="file" @change="Upload">
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-card>
            </v-hover>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Register",
        data() {
            return {
                isFormValid: false,
                loading: false,
                name: null,
                surname: null,
                email: null,
                contact: null,
                password: null,
                confirmPassword: null,

                nameRules: [
                    v => !!v || 'Name is required!'
                ],
                surnameRules: [
                    v => !!v || 'Surname is required!'
                ],
                contactRules: [
                    v => !!v || 'Phone is required !'
                ],
                passwordRules: [
                    v => !!v || 'Password is required!',
                    v => v === this.confirmPassword || 'Please, enter password again!'
                ],
                confirmPasswordRules: [
                    v => !!v || 'Confirmation is required!',
                    v => v === this.password || 'Please, enter password again!'
                ],
                emailRules: [
                    v => !!v || 'E-mail is required!',
                    v => /.+@.+/.test(v) || 'E-mail should be valid!'
                ],
            }
        },

        methods: {
            validatePass () {
                this.$refs.registerForm.password.validate();
                this.$refs.registerForm.confirmPassword.validate();
            },

            Upload (event) {
                const selectedFile = event.target.files[0];

                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('image', selectedFile, selectedFile.name);
                    console.log(formData);
                    axios.post('/api/upload/avatar', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        console.log(res.data);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .space-for-register {
        min-height: 79.91vh;
    }

    .card-register {
        margin-top: 20vh;
        padding: 40px;
    }
</style>
