(function(){
    // 思源挂件的iframe容器限制最小宽，自适应高
    const setting_container = document.getElementById("setting_container")
    function adjust_siyuan_frame_height() {
        if(window.frameElement){
            let total_height = content_container.clientHeight
            if(setting_container.style.display != 'none' && setting_container.style.display != '') {
                let height = setting_container.offsetHeight + 31
                total_height = Math.max(total_height, height)
            }
            // 应该是思源的iframe有边框，差2
            total_height = total_height + 2
            // 高自适应
            window.frameElement.style.minHeight = total_height + "px"
            window.frameElement.style.maxHeight = total_height + "px"
        }
    }
    if(window.frameElement){
        let min_width = 350
        let height = 63
        window.frameElement.style.minWidth = min_width + "px"
        window.frameElement.style.minHeight = height + "px"
        window.frameElement.style.maxHeight = height + "px"
        if(window.frameElement.style.width === ""){
            window.frameElement.style.width = "400px"
        }
        let content_container = document.getElementById("content_container")
        const observer = new ResizeObserver(entries => {
            /*
                adjust_siyuan_frame_height中修改大小会报: "ResizeObserver loop completed with undelivered notifications."
                本来也不需要通知到ResizeObserver，忽略. 不知道有没有更好的方法自适应大小
            */
            adjust_siyuan_frame_height()
        })
        observer.observe(content_container)
    }

    // 动态创建下拉框选项
    const select_element = document.getElementById('hitokoto_type_select')
    Object.entries(HitokotoType).forEach(([key, value]) => {
        const option = document.createElement('option')
        option.value = key // 设置值为 key
        option.textContent = value.text // 设置显示文本
        select_element.appendChild(option) // 添加选项到下拉框
    })


    function hide_setting(){
        setting_container.style.display = 'none' // 隐藏设置
        adjust_siyuan_frame_height()
    }
    const menuButton = document.getElementById('menu')
    // 点击按钮时显示设置菜单
    menuButton.addEventListener('click', function(event) {
        // 阻止事件冒泡
        event.stopPropagation()
        if (setting_container.style.display === 'none' || setting_container.style.display === '') {
            setting_container.style.display = 'flex' // 显示设置
            adjust_siyuan_frame_height()
        }
    })
    // 点击设置面板不关设置菜单
    setting_container.addEventListener('click', function(event) {
        event.stopPropagation()
    })

    // 点击其他位置关闭设置菜单
    document.documentElement.addEventListener("click", function () {
        if (setting_container.style.display != 'none' && setting_container.style.display != '') {
            hide_setting()
        }
    })

    // 选择一言类型
    select_element.addEventListener('change', function() {
        set_setting_value(OptionKey.select, this.value)
        get_and_set_one_sentence("hitokoto_label", "author_label", this.value)
        adjust_siyuan_frame_height()
        hide_setting()   // 隐藏设置
    })

    // 是否允许超链接跳转一言
    const link_option_checkbox = document.getElementById("link_option_checkbox")
    link_option_checkbox.addEventListener("change", function(){
        set_setting_value(OptionKey.link, this.checked)
        set_link_click(this.checked)
        hide_setting()   // 隐藏设置
    })

    const bg_color_select = document.getElementById("bg_color_select")
    const bg_color_input = document.getElementById("bg_color_input")
    const color_select = document.getElementById("color_select")
    const color_input = document.getElementById("color_input")
    function update_color(){
        document.getElementById("hitokoto_label").style.color = color_input.value
        document.getElementById("author_label").style.color = color_input.value
        document.documentElement.style.backgroundColor = bg_color_input.value
    }
    function color_modify(modify_element, another_element){
        let color = modify_element.value
        if(check_color_hex3(color) || check_color_hex4(color)){
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
    // 背景色选择
    bg_color_select.addEventListener("change", function() {
        color_modify(bg_color_select, bg_color_input)
    })
    bg_color_input.addEventListener("change", function () {
        color_modify(bg_color_input, bg_color_select)
    })

    // 字色选择
    color_select.addEventListener("change", function() {
        color_modify(color_select, color_input)
    })
    color_input.addEventListener("change", function () {
        color_modify(color_input, color_select)
    })

    /*
        初始化各设置状态并请求一言
    */
    get_setting_initial_value()
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

        get_and_set_one_sentence("hitokoto_label", "author_label", select_element.value)
        adjust_siyuan_frame_height()
    })
})()
