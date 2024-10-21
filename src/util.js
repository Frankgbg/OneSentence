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
