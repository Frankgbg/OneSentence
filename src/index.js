/*
    index.html 复杂逻辑,公共接口
*/

function force_hitokoto_type(value){
    value = value ?? "poetry"
    if(typeof value != "string" || !HitokotoType.hasOwnProperty(value)){
        value = "poetry"
    }
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

const OptionKey = Object.freeze({
    "select": "custom-select",
    "link": "custom-link",
    "text_color": "custom-text-color",
    "bg_color": "custom-bg-color",
})
let block_id = "20241022000105-i04x7xu" // 非思源中测试时改这个
async function get_setting_values(){
    let _block_id = get_current_block_id() || block_id
    let data = await get_block_attr(_block_id)
    // 类型
    data[OptionKey.select] = force_hitokoto_type(data[OptionKey.select])
    // 是否跳转超链接
    data[OptionKey.link] = force_bool(data[OptionKey.link], "false")
    data[OptionKey.text_color] = force_color_hex(data[OptionKey.text_color], "#000000")
    data[OptionKey.bg_color] = force_color_hex(data[OptionKey.bg_color], "#90EE904C")
    return data
}

async function set_setting_value(key, value){
    let _block_id = get_current_block_id() || block_id
    value = value.toString()
    let code = await set_block_attr(_block_id, {
        [key]: value,
    })
}

async function get_and_set_one_sentence(select_value){
    function setText(label_id, text){
        const text_label = document.getElementById(label_id)
        if(text_label){
            text_label.innerText = text ?? ""
        }
    }
    const data = await fetch_hitokoto(select_value)
    // const data = {
    //     ok: true,
    //     error_msg: "强制错误",
    //     text: "总是以为我们会长久，可能因为我们会长久，然后这样我们就长久。",
    //     author: "北川理惠",
    //     from: "三行情书",
    // }
    if(data.ok){
        setText("hitokoto_label", data.text)
        if(data.author){
            setText("author_label", `-- ${data.author}, *${data.from}*`)
        }else{
            setText("author_label", `-- ${data.from}`)
        }
        set_link_click(can_link_click())
    }else{
        setText("hitokoto_label", data.error_msg)
        setText("author_label", "")
        set_link_click(false)
    }
}

function update_color(){
    const bg_color_input = document.getElementById("bg_color_input")
    const color_input = document.getElementById("color_input")
    document.getElementById("hitokoto_label").style.color = color_input.value
    document.getElementById("author_label").style.color = color_input.value
    document.documentElement.style.backgroundColor = bg_color_input.value
}

function color_modify(modify_element, another_element){
    const bg_color_select = document.getElementById("bg_color_select")
    const color_select = document.getElementById("color_select")

    let color = modify_element.value
    if(is_color_hex3(color) || is_color_hex4(color)){
        if(modify_element == bg_color_select || another_element == bg_color_select){
            set_setting_value(OptionKey.bg_color, color)
        }else if(modify_element == color_select || another_element == color_select){
            set_setting_value(OptionKey.text_color, color)
        }
        modify_element.dataset.before_value = color
        if(another_element == bg_color_select || another_element == color_select){
            color = convert_to_hex3(color)
        }
        another_element.value = color
        another_element.dataset.before_value = color
        update_color()
    }else{
        modify_element.value =  modify_element.dataset.before_value // 颜色输入不对，用之前的恢复
    }
}
