/*
    index.html 复杂逻辑,公共接口
*/

async function get_and_set_one_sentence(text_label_id, from_label_id, select_value){
    function setText(labelId, text){
        const textLabel = document.getElementById(labelId)
        if(textLabel){
            textLabel.innerText = text ?? ""
        }
    }
    const data = await fetch_hitokoto(select_value)
    // const data = {
    //     ok: true,
    //     error_msg = "强制错误",
    //     text: "总是以为我们会长久，可能因为我们会长久，然后这样我们就长久。",
    //     author: "北川理惠",
    //     from: "三行情书",
    // }
    if(data.ok){
        setText(text_label_id, data.text)
        if(data.author){
            setText(from_label_id, `-- ${data.author}, *${data.from}*`)
        }else{
            setText(from_label_id, `-- ${data.from}`)
        }
        set_link_click(is_link_click())
    }else{
        setText(text_label_id, data.error_msg)
        setText(from_label_id, "")
        set_link_click(false)
    }
}

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
    if(!check_color_hex3(value) && !check_color_hex4(value)){
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
let block_id = "20241019234534-p00r5ni" // 非思源中测试时改这个
async function get_setting_initial_value(){
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
