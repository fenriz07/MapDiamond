import { callMeApi } from "../../api/callMeApi";
import FormValidation from "../formValidate"
import Swal from 'sweetalert2'


export default class {

    constructor() {
        this.form = document.getElementById('form-llamanos');
        this.form.addEventListener('submit', this, false);
        this.btn = document.getElementById('btn-form-llamamos');
        this.extraValidation();


    }

    handleEvent(evt) {
        evt.preventDefault();

        this.formValidation = new FormValidation('form-llamanos', '#form-llamanos', true);

        if (this.formValidation.validForm !== true) {
            return false;
        }

        this.btn.disabled = true;
        this.btn.textContent = 'Enviando...';

        this.registerData('dataAgenda');

        let rut = this.dataAgenda.get("rut");
        let name = this.dataAgenda.get("nombre");
        let email = this.dataAgenda.get("email");
        let phone = this.dataAgenda.get("telefono");

        grecaptcha.ready(() => {
            grecaptcha.execute('6Lf_HTMaAAAAAEjPCz9mQAvRs6bPZTcLJDtfAbhc', { action: 'callme' }).then((token) => {

                callMeApi(rut, name, email, phone, 'callme', token).then(response => {


                    if (response.status == 500) {
                        document.querySelector('#result-contact').innerHTML = `<p> ${response.payload}. Intente nuevamente</p>`
                        this.btn.disabled = false;
                        this.btn.textContent = 'Enviar';
                    } else if (response.status == 200) {
                        Swal.close()
                        Swal.fire(
                            {
                                title: response.payload,
                                icon: "success",
                                confirmButtonText: "Cerrar",
                            }
                        )
                    }

                }).catch(error => {
                    console.log(error);
                })

            });
        });



    }

    registerData(storage) {
        this[storage] = new FormData(document.getElementById('form-llamanos'));
    }

    extraValidation() {
        let alphanumeric_guion_k = /[ Kk0-9-]/;

        let numeric = /^[0-9]+$/i



        jQuery(`.input-rut`).keypress(function (e) {
            this.value = this.value.toUpperCase();

            if (this.value.length == 1) {
                if (this.value == 0) {
                    this.value = '';
                }
            } else {
                if (this.value[0] == 0) {
                    let part1 = this.value.substring(0, 0);
                    let part2 = this.value.substring(0 + 1, this.value.length);
                    this.value = part1 + part2;
                }
            }

        });

        jQuery(`.input-rut`).keyup(function (e) {
            this.value = this.value.toUpperCase();

            if (this.value.length == 1) {
                if (this.value == 0) {
                    this.value = '';
                }
            } else {
                if (this.value[0] == 0) {
                    let part1 = this.value.substring(0, 0);
                    let part2 = this.value.substring(0 + 1, this.value.length);
                    this.value = part1 + part2;
                }
            }

        });

        jQuery(`.input-rut`).keypress(function (e) {
            var keyChar = String.fromCharCode(e.which || e.keyCode);
            return alphanumeric_guion_k.test(keyChar) ? keyChar : false;
        });


        jQuery(`.input-rut`).rut({
            formatOn: 'keyup',
            minimumLength: 8,
        });

        jQuery(`#input_telefono`).keypress(function (e) {
            var keyChar = String.fromCharCode(e.which || e.keyCode);
            return numeric.test(keyChar) ? keyChar : false;
        });


        let alpha = /[ A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\u0027\s]/;

        jQuery(`#input_nombre`).keypress(function (e) {
            var keyChar = String.fromCharCode(e.which || e.keyCode);
            return alpha.test(keyChar) ? keyChar : false;
        });

    }

}