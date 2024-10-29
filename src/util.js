function is_color_hex3(color){
    let result = color.match(/^#[0-9a-fA-F]{6}$/)
    if(result != null) result = result[0]
    return result == color
}

function is_color_hex4(color){
    let result = color.match(/^#[0-9a-fA-F]{8}$/)
    if(result != null) result = result[0]
    return result == color
}

// 自己保证color是hex3或hex4，这里不管
function convert_to_hex3(color){
    if(is_color_hex4(color)){
        return color.substring(0, 7)
    }
    return color
}

// 将map中的key用','连接
function concatenate_key(map, sep = ','){
    let str = ""
    if(sep.length != 1){
        console.error("sep 参数只能是单个字符!!!")
        return str
    }
    Object.entries(map).forEach(([key, value]) => {
        str = `${str}${key}${sep}`
    })
    if(str.slice(-1) === sep){
        str = str.slice(0, -1)
    }
    return str
}

function force_hitokoto_type_map(value){
    value = value ?? ""
    value = value.split(',').filter(item =>{
        let s = item.trim()
        return s !== '' && HitokotoType.hasOwnProperty(s)
    }).reduce((acc, item) => {
        acc[item.trim()] = true
        return acc
    }, {})
    return value
}

function force_bool(value, default_value){
    value = value ?? default_value
    if(value != "true" && value != "false"){
        value = default_value
    }
    return JSON.parse(value.toLowerCase())
}

function force_color_hex(value, default_value){
    value = value ?? default_value
    if(!is_color_hex3(value) && !is_color_hex4(value)){
        value = default_value
    }
    return value
}
