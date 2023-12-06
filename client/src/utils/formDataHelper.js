export function objectToFormData(
    obj,
    namespace = null,
    formData = new FormData()
) {
    for (let propertyName in obj) {
        if (isValidProperty(obj, propertyName)) {
            const formKey = getFormKey(namespace, propertyName);
            // post[key] = value;
            // post[title] = "Merhaba Dünya";
            appendToFormData(formData, formKey, obj[propertyName]);
        }
    }
    return formData;
}

function isValidProperty(obj, propertyName) {
    return (
        Object.prototype.hasOwnProperty.call(obj, propertyName) &&
        obj[propertyName] !== undefined &&
        obj[propertyName] !== null
    );
}
function getFormKey(namespace, propertyName) {
    return namespace ? `${namespace}[${propertyName}]` : propertyName;
}

function appendToFormData(formData, formKey, value) {
    // Date || Object != file || başka bir şeyse
    if (value instanceof Date) {
        appendAsDate(formData, formKey, value);
    } else if (isObjectButNotFile(value)) {
        objectToFormData(value, formKey, formData);
    } else {
        formData.append(formKey, value);
    }
}

function appendAsDate(formData, formKey, date) {
    formData.append(formKey, date.toISOString());
}

function isObjectButNotFile(value) {
    return typeof value === "object" && !(value instanceof File);
}

export function formDataToObject(formData) {
    const obj = {};
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }
    return obj;
}