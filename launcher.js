(function(){
    // 动态创建下拉框选项
    const select_element = document.getElementById('hitokoto_type_select')
    Object.entries(HitokotoType).forEach(([key, value]) => {
        const option = document.createElement('option')
        option.value = key // 设置值为 key
        option.textContent = value.text // 设置显示文本
        select_element.appendChild(option) // 添加选项到下拉框
    })

    const setting_container = document.getElementById("setting_container")
    function hide_setting(){
        setting_container.style.display = "none" // 隐藏设置
        adjust_siyuan_frame_height()
    }
    const menu_button = document.getElementById("menu")
    // 点击按钮时切换设置菜单状态
    menu_button.addEventListener("click", function(event){
        event.stopPropagation()
        if(setting_container.style.display === "none" || setting_container.style.display === ""){
            setting_container.style.display = 'flex' // 显示设置
            adjust_siyuan_frame_height()
        }else{
            hide_setting()
        }
    })
    // 点击设置面板不关设置菜单
    setting_container.addEventListener("click", function(event){
        event.stopPropagation()
    })
    // 点击其他位置关闭设置菜单
    document.documentElement.addEventListener("click", function(){
        if(setting_container.style.display != "none" && setting_container.style.display != ""){
            hide_setting()
        }
    })
    // 失去焦点时关闭设置菜单
    window.addEventListener("blur", function(){
        if(setting_container.style.display != "none" && setting_container.style.display != ""){
            hide_setting()
        }
    })


    // 选择一言类型
    select_element.addEventListener("change", function(){
        set_setting_value(OptionKey.select, this.value)
        hide_setting()   // 隐藏设置
        get_and_set_one_sentence(this.value)
        adjust_siyuan_frame_height()
    })

    // 是否允许超链接跳转一言
    const link_option_checkbox = document.getElementById("link_option_checkbox")
    link_option_checkbox.addEventListener("change", function(){
        set_setting_value(OptionKey.link, this.checked)
        set_link_click(this.checked)
        hide_setting()   // 隐藏设置
    })

    // 背景色选择
    const bg_color_select = document.getElementById("bg_color_select")
    const bg_color_input = document.getElementById("bg_color_input")
    bg_color_select.addEventListener("change", function(){
        color_modify(bg_color_select, bg_color_input)
    })
    bg_color_input.addEventListener("change", function(){
        color_modify(bg_color_input, bg_color_select)
    })

    // 字色选择
    const color_select = document.getElementById("color_select")
    const color_input = document.getElementById("color_input")
    color_select.addEventListener("change", function(){
        color_modify(color_select, color_input)
    })
    color_input.addEventListener("change", function(){
        color_modify(color_input, color_select)
    })

    /*
        初始化各设置状态并请求一言
    */
    get_setting_values()
    .then((data) => {
        select_element.value = data[OptionKey.select]
        link_option_checkbox.checked = data[OptionKey.link]
        set_link_click(data[OptionKey.link])
        bg_color_select.value = convert_to_hex3(data[OptionKey.bg_color])
        bg_color_select.dataset.before_value = bg_color_select.value
        bg_color_input.value = data[OptionKey.bg_color]
        bg_color_input.dataset.before_value = bg_color_input.value
        color_select.value = convert_to_hex3(data[OptionKey.text_color])
        color_select.dataset.before_value = color_select.value
        color_input.value = data[OptionKey.text_color]
        color_input.dataset.before_value = color_input.value
        update_color()

        get_and_set_one_sentence(select_element.value)
        adjust_siyuan_frame_height()
    })
})()
