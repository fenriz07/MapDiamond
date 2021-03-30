export default class{
    constructor(rulesName, formId, ajax = false) {
      this.formId = formId;
      this.rulesName = rulesName;
      this.rules = {
        "form-llamanos" : {
            input_rut : {
                withOtherIcon: true,
                elementType: 'input',
                required: true,
                isRut   : true,
            },
            'input_nombre':{
                withOtherIcon: true,
                elementType: 'input',
                required: true,
                maxLength : 15,
            },
            'input_email':{
                withOtherIcon: true,
                elementType: 'input',
                required: true,
                isEmail: true,
            },
            'input_telefono':{
                    withOtherIcon: true,
                    elementType: 'input',
                    required: true,
                    isNumeric: true,
                    minLength:9,
             }
        }
      };
      this.messages = {
        es: {
          required: 'Este campo es obligatorio',
          isEmail: 'El correo es inválido',
          isNumeric: 'Escribe solo números',
          isRut : 'RUT incorrecto',
          isDecimalNumber: 'Solo puedes agregar dos decimales ejemplo: 1.00',
          isOnlyLetters: 'Escribe solo letras',
          shouldEqualTo: 'Las contraseñas no coinciden',
          shouldEqualToEmail: 'Los correos no coinciden',
          minLength: minLength => `La cantidad minima de caracteres es ${minLength}`,
          maxLength: maxLength => `La cantidad maxima de caracteres es ${maxLength}`,
          isPhone : 'Teléfono inválido',
          uniqueRut : 'Identificación duplicada',
          uniqueEmail : 'El correo ya esta en uso.',
          'yearoldmin' : 'Debes tener 18 años como minimo',
          isFiles : 'El documento de identidad es obligatorio',
          isDate  : 'El formato de la fecha no es el correcto. Ej: 12-05-1991',
          maxFiles :  maxFiles => `Se permiten máximo ${maxFiles} archivos.`,
          maxSize  :  maxSize  => `El tamaño máximo de todos los archivos es de ${maxSize} MB`,
          validateExtension : 'Archivos o archivo con extensiones no permitidas',
        },
        en: {
          required: 'This field is required',
          isEmail: 'The email is invalid',
          isNumeric: 'Write only numbers',
          isDecimalNumber: 'You can only write two decimals, per example: 1.00',
          isOnlyLetters: 'Write only letters',
          shouldEqualTo: 'The passwords aren\'t equals',
          minLength: minLength => `The maximum amount of chars is ${minLength}`,
          maxLength: maxLength => `The minimum amount of chars is ${maxLength}`,
        },
      };
      this.lang = jQuery('html').attr('lang') || 'es';
      this.validForm = true
  
      const rules = this.rules[rulesName];
  
      const handleOnChangeInput = this.handleOnChange.bind(this, rules, 'input');
      const handleOnChangeSelect = this.handleOnChange.bind(this, rules, 'select');
      
      const keys = Object.keys(rules);
      let isValid = true;      
      keys.forEach(key => {
          const value = rules[key];
          const eventObj = { target: document.getElementById(key) };
          const validInput = this.handleOnChange(rules, value.elementType, eventObj);      
          isValid = isValid && validInput.isValid;
      });      
 
      this.validForm = isValid;


      jQuery(`${formId} input`).focusout(handleOnChangeInput);
      jQuery(`${formId} select`).focusout(handleOnChangeSelect);
      jQuery(`${formId} input`).on('change', handleOnChangeInput);
      jQuery(`${formId} select`).on('change', handleOnChangeSelect);
      jQuery(`${formId} input`).on('keyup', this.handleOnKeyUp.bind(this, rules));
      jQuery(`${formId} input`).on('keydown', this.handleOnKeyDown.bind(this, rules));


      //jQuery(formId).submit(handleOnSubmit);
    }
  
    formIsValid( except = [],rutflag = false ) {
  
      //return true;
  
      const rules = this.rules[this.rulesName];
      const keys = Object.keys(rules);
  
      let isValid = true;
  
      keys.forEach(key => {
  
        if( !except.includes( key ) )
        {
          const value = rules[key];
          const eventObj = { target: document.querySelector( this.formId + ' ' + '#' + key) };
          const validInput = this.handleOnChange(rules, value.elementType, eventObj);
  
          isValid = isValid && validInput.isValid;
        }
  
      });
  
  
      return isValid;
    }
  
    checkValidity(field, rules) {
      const value = rules.elementType === 'checkbox' ? field.checked : field.value;
      const messages = this.messages['es'];
      let isValid = true;
      let message = [];
  
      if (!rules) {
        return [isValid, message.join('. ')];
      }
  
      if (rules.required) {

        if( rules.isTextNoRequired == true && field.type == 'text')
        {
          isValid = true;
        }else{

          if (typeof value === 'object') {
            isValid = Object.keys(value).length && isValid;
          }
    
          if (typeof value === 'string') {
            isValid = value.trim() !== '' && isValid;
          }
    
          if (rules.elementType === 'select' && value === rules.defaultValue) {
            isValid = false;
          }
    
          if (rules.elementType === 'checkbox' && !value) {
            isValid = false;
          }
    
          isValid || message.push(messages.required);

        }



      }
      
      if( rules.isFiles ){
        if( window.filesList.length == 0 )
        {
          isValid = false;
          message.push(messages.isFiles);
        }
      }
  
      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        isValid || message.push(messages.minLength(rules.minLength));
      }

      if( rules.maxFiles){
        isValid = window.filesList.length <= rules.maxFiles && isValid;
        isValid || message.push(messages.maxFiles( rules.maxFiles) )
      }

      if( rules.validateExtension)
      {


        let extensions = [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'application/pdf',
        ]

        let flag = false;

        for (let index = 0; index < field.files.length; index++) 
        {

          let file = field.files[index];

          if( !extensions.includes( file.type ) && flag == false)
          {
            isValid = false;
            message.push(messages.validateExtension );
            flag = true;
          }else if( isValid == false )
          {
            isValid = false;
          }

        }

      }

      if( rules.maxSize )
      {

          let maxSize = rules.maxSize;

          let size = 0;

          let maxSizeinBytes = maxSize * 1024 * 1024
  
          for (let index = 0; index < field.files.length; index++) {
            size += field.files[index].size;
          }

          if( maxSizeinBytes < size  )
          {
            message.push( messages.maxSize( rules.maxSize ));
            isValid = false;
          }

      }
  
      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
        isValid || message.push(messages.maxLength(rules.maxLength));
      }

      if( rules.isDate )
      {
        const date = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
        isValid = date.test(value) && isValid;
        isValid || message.push(messages.isDate);
      }
  
      if (rules.isEmail) {
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(value) && isValid;
        isValid || message.push(messages.isEmail);
      }

      if( rules.yearoldmin )
      {

        let birthday = +new Date(value.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

        let age = ((Date.now() - birthday) / (31557600000));

        if( age < 18 ){
          isValid = false;
          message.push(messages.yearoldmin);
        }
      }
  
      if( rules.uniqueEmail )
      {
        let email =  document.querySelector('#formStepTwo #correo-electronico2').value;
  
        if(email == value)
        {
          isValid = false;
          message.push(messages.uniqueEmail);
        }
  
      }
  
      if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
        isValid || message.push(messages.isNumeric);
      }

      if(rules.isRutPayer)
      {
          isValid = jQuery.validateRut(value, null, { minimumLength: 4 });
  
          isValid || message.push(messages.isRut);
      }

  
      if( rules.isRut ){
  
          let formParentId = field.closest('form').id;
  
          isValid = jQuery.validateRut(value, null, { minimumLength: 4 });
  
          isValid || message.push(messages.isRut);
        
      }
  
      if( rules.uniqueRut)
      {
  
        let type_indentifier = document.querySelector('#formStepTwo #tipo_documento').value;
        let country           = document.querySelector('#formStepTwo #pais_emisor_e').value;
        let dni = document.querySelector('#formStepTwo #dni').value;
  
        let type_indentifier2 = document.querySelector('#formStepTwo2x1 #tipo_documento').value;
        let country2           = document.querySelector('#formStepTwo2x1 #pais_emisor_e').value;
        let dni2 = document.querySelector('#formStepTwo2x1 #dni').value;
  
        let fkey = type_indentifier + country + dni;
        let skey = type_indentifier2 + country2 + dni2;
  
  
        if(fkey == skey)
        {
          isValid = false;
          message.push(messages.uniqueRut);
        }
  
      }
  
      if (rules.isPhone) {
        const pattern = /^[\+]?\d+$/;
        isValid = pattern.test(value) && isValid;
        isValid || message.push(messages.isPhone);
      }
  
  
      if (rules.isDecimalNumber) {
        const pattern = /^\d+\.\d{1,2}$/;
        isValid = pattern.test(value) && isValid;
        isValid || message.push(messages.isDecimalNumber);
      }
  
    
  
      if (rules.isOnlyLetters) {
        const pattern = /^[A-Za-z]+$/;
        isValid = pattern.test(value) && isValid;
        isValid || message.push(messages.isOnlyLetters);
      }
  
      if (rules.shouldEqualTo) {
        const shouldValue = jQuery(`#${rules.shouldEqualTo}`).val();
  
        isValid = shouldValue === value && isValid;
        isValid || message.push(messages.shouldEqualTo);
      }
  
      if (rules.shouldEqualToEmail) {
        const shouldValue = jQuery(`#${rules.form} #${rules.shouldEqualToEmail}`).val();
  
        if(isValid)
        {
          isValid = shouldValue === value && isValid;
          isValid || message.push(messages.shouldEqualToEmail);
        }
  
      }
  
      return { isValid, message: message.join('. ') };
    }
  
    spanIconForInput(iconName, withOtherIcon) {
        return `
        <span class='icon-input icon-${iconName} ${withOtherIcon ? '--withOtherIcon' : ''}'></span>
      `;
    }
  
    validationFeedback(isValid, message) {
      return `
          <div class='${isValid ? 'valid' : 'invalid'}-feedback'>
            ${message}
          </div>
        `;
    }
  
    handleOnChange(formRules, type, event) {
      const id = event.target.id;
      const rules = formRules[id];
      let valid = { isValid: false };
  
      if (rules) {
        valid = this.checkValidity(event.target, rules);
        const $input = jQuery(event.target);
  
        $input.parent().find('span.icon-input').remove();
        $input.parent().find('.invalid-feedback').remove();
  
        if (valid.isValid) {
          $input.removeClass('is-invalid');
          $input.addClass('is-valid');
  
          if (!rules.withoutIcon)
            $input
              .parent()
              .append(this.spanIconForInput('check', rules.withOtherIcon));
        } else {
          $input.removeClass('is-valid');
          $input.addClass('is-invalid');
  
          if (!rules.withoutIcon)
            $input.parent().append(this.spanIconForInput('cancel', rules.withOtherIcon));
  
          $input.parent().append(this.validationFeedback(false, valid.message));
        }
      }
  
      return valid;
    }
  
    handleOnKeyUp(formRules, event) {
      const id = event.target.id;
      const rules = formRules[id];
      let value = event.target.value;
  
      if (rules && rules.isOnlyLetters) {
        value = value.trim();
        value = value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
      }
  
      event.target.value = value;
    }
  
    handleOnKeyDown(formRules, event) {
      const id = event.target.id;
      const rules = formRules[id];
  
      if (rules && rules.isOnlyLetters) {
        if (event.ctrlKey || event.altKey || !/^[A-Za-z]+$/.test(event.key)) {
          event.preventDefault();
        } else {
          const key = event.keyCode;
  
          if (!(
            (key == 8)
            || (key == 9)
            || (key == 32)
            || (key == 46)
            || (key >= 35 && key <= 40)
            || (key >= 65 && key <= 90)
          )) {
            event.preventDefault();
          }
        }
      }
    }
  }
