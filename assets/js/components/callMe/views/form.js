
export default () => {
    
    return `
    <form id="form-llamanos" class="wpcf7-form">
            <div class="row">
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                        <label for="input_rut">RUT *</label>
                        <input type="text" name="rut" id="input_rut" class="input-rut" placeholder="ingrese su rut">
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                        <label for="input_nombre">Nombre *</label>
                        <input type="text" name="nombre" id="input_nombre">
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                        <label for="input_email">Email *</label>
                        <input type="text" name="email" id="input_email">
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                        <label for="input_telefono">Telefono*</label>
                        <input type="text" name="telefono" id="input_telefono">
                    </div>
                </div>
            </div>
            
            <div class="green-button">
                <button id="btn-form-llamamos"  type="submit">Enviar</button>
            </div>

            <span id="result-contact">  </span>
        </form>
    `
}
