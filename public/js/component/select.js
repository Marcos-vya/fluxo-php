export const Select = (label, options,id) => {
    const opts = options.map(({ name, value }) => {
        return ` <option class="" value="${value}">${name}</option>`
    })

    return( `
            <fieldset class="">
                <legend class="">${label}</legend>
                <select class="" id="${id}" name="${id}">
                    ${opts}
                </select>
            </fieldset> 
        `)

}
