import * as Blockly from 'blockly/core'
import 'blockly/javascript'
import { javascriptGenerator } from 'blockly/javascript'

Blockly.Blocks['customized_multi_sensor_door'] = {
    init: function () {
        this.jsonInit({
            type: 'customized_multi_sensor_door',
            message0: '%1 Multi Sensor %2 detects %3 is %4',
            args0: [
                {
                    type: 'field_image',
                    src: '/img/blockly/devices.jpg',
                    width: 15,
                    height: 15,
                    alt: '*',
                    flipRtl: false,
                },
                {
                    type: 'field_dropdown',
                    name: 'device',
                    options: [
                        ['multi sensor 1', 'MULTI_SENSOR_1'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'field_dropdown',
                    name: 'sensor',
                    options: [
                        ['door', 'DOOR'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'inputs',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 300,
            tooltip: "Checks Multi Sensor's Door status.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['customized_multi_sensor_motion'] = {
    init: function () {
        this.jsonInit({
            type: 'customized_multi_sensor_motion',
            message0: '%1 Multi Sensor %2 detects %3 is %4',
            args0: [
                {
                    type: 'field_image',
                    src: '/img/blockly/devices.jpg',
                    width: 15,
                    height: 15,
                    alt: '*',
                    flipRtl: false,
                },
                {
                    type: 'field_dropdown',
                    name: 'device',
                    options: [
                        ['multi sensor 1', 'MULTI_SENSOR_1'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'field_dropdown',
                    name: 'sensor',
                    options: [
                        ['motion', 'MOVEMENT'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'inputs',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 300,
            tooltip: "Checks Multi Sensor's Motion.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['customized_multi_sensor_button'] = {
    init: function () {
        this.jsonInit({
            type: 'customized_multi_sensor_button',
            message0: '%1 Multi Sensor %2 detects %3 %4',
            args0: [
                {
                    type: 'field_image',
                    src: '/img/blockly/devices.jpg',
                    width: 15,
                    height: 15,
                    alt: '*',
                    flipRtl: false,
                },
                {
                    type: 'field_dropdown',
                    name: 'device',
                    options: [
                        ['multi sensor 1', 'MULTI_SENSOR_1'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'field_dropdown',
                    name: 'sensor',
                    options: [
                        ['button', 'BUTTON'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'inputs',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 300,
            tooltip: "Checks Multi Sensor's Button.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['customized_smart_button'] = {
    init: function () {
        this.jsonInit({
            type: 'customized_smart_button',
            message0: '%1 Smart Button %2 detects button is %3 %4',
            args0: [
                {
                    type: 'field_image',
                    src: '/img/blockly/devices.jpg',
                    width: 15,
                    height: 15,
                    alt: '*',
                    flipRtl: false,
                },
                {
                    type: 'field_dropdown',
                    name: 'device',
                    options: [
                        ['smart button 1', 'SMART_BUTTON_1'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'field_dropdown',
                    name: 'sensor',
                    options: [
                        ['pressed', 'PRESSED'],

                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'inputs',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 300,
            tooltip: "Checks Smart Button's status.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['customized_door_sensor'] = {
    init: function () {
        this.jsonInit({
            type: 'customized_door_sensor',
            message0: '%1 Door Sensor %2 detects door is %3 %4',
            args0: [
                {
                    type: 'field_image',
                    src: '/img/blockly/devices.jpg',
                    width: 15,
                    height: 15,
                    alt: '*',
                    flipRtl: false,
                },
                {
                    type: 'field_dropdown',
                    name: 'device',
                    options: [
                        ['door sensor 1', 'DOOR_SENSOR_1'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'field_dropdown',
                    name: 'sensor',
                    options: [
                        ['opened', 'OPENED'],
                        ['closed', 'CLOSED'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'inputs',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 300,
            tooltip: "Checks Door Sensor's status.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['customized_motion_detector'] = {
    init: function () {
        this.jsonInit({
            type: 'customized_motion_detector',
            message0: '%1 Motion Detector %2 detects motion is %3 %4',
            args0: [
                {
                    type: 'field_image',
                    src: '/img/blockly/devices.jpg',
                    width: 15,
                    height: 15,
                    alt: '*',
                    flipRtl: false,
                },
                {
                    type: 'field_dropdown',
                    name: 'device',
                    options: [
                        ['motion detector 1', 'MOTION_DETECTOR_1'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'field_dropdown',
                    name: 'sensor',
                    options: [
                        ['detected', 'DETECTED'],
                        ['undetected', 'UNDETECTED'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'inputs',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 300,
            tooltip: "Checks Motion Detector's status.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['customized_thermometer_hygrometer'] = {
    init: function () {
        this.jsonInit({
            type: 'customized_thermometer_hygrometer',
            message0: '%1 Thermometer Hygrometer %2 detects %3 %4',
            args0: [
                {
                    type: 'field_image',
                    src: '/img/blockly/devices.jpg',
                    width: 15,
                    height: 15,
                    alt: '*',
                    flipRtl: false,
                },
                {
                    type: 'field_dropdown',
                    name: 'device',
                    options: [
                        [
                            'thermometer hygrometer 1',
                            'THERMOMETER_HYGROMETER_1',
                        ],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'field_dropdown',
                    name: 'sensor',
                    options: [
                        ['temperature', 'TEMPERATURE'],
                        ['humidity', 'HUMIDITY'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'inputs',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 300,
            tooltip: "Checks Thermometer Hygrometer's Temperature or Humidity.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

// Define custom blocks for Devices category
Blockly.Blocks['customized_device_info'] = {
    init: function () {
        this.jsonInit({
            type: 'customized_device_info',
            message0: '%1 Multi Sensor %2 device %3 %4',
            args0: [
                {
                    type: 'field_image',
                    src: '/img/blockly/devices.jpg',
                    width: 15,
                    height: 15,
                    alt: '*',
                    flipRtl: false,
                },
                {
                    type: 'field_dropdown',
                    name: 'device',
                    options: [
                        ['multi sensor 1', 'MULTI_SENSOR_1'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'field_dropdown',
                    name: 'sensor',
                    options: [
                        ['name', 'NAME'],
                        ['mac', 'MAC'],
                        ['type', 'TYPE'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'inputs',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 300,
            tooltip: "Multi Sensor's Device Datas.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['customized_multi_sensor_temperature_humidity'] = {
    init: function () {
        this.jsonInit({
            type: 'customized_multi_sensor_temperature_humidity',
            message0: '%1 Multi Sensor %2 last %3 %4',
            args0: [
                {
                    type: 'field_image',
                    src: '/img/blockly/devices.jpg',
                    width: 15,
                    height: 15,
                    alt: '*',
                    flipRtl: false,
                },
                {
                    type: 'field_dropdown',
                    name: 'device',
                    options: [
                        ['multi sensor 1', 'MULTI_SENSOR_1'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'field_dropdown',
                    name: 'sensor',
                    options: [
                        ['temperature', 'TEMPERATURE'],
                        ['humidity', 'HUMIDITY'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'inputs',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 300,
            tooltip: "Checks Multi Sensor's Temperature or Humidity.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

// Define custom blocks for Messages category
Blockly.Blocks['customized_send_email'] = {
    init: function () {
        this.jsonInit({
            message0: '%3 Send email by subject: %1 and body: %2',
            args0: [
                {
                    type: 'input_value',
                    name: 'subject',
                },
                {
                    type: 'input_value',
                    name: 'body',
                },
                {
                    type: 'field_image',
                    src: '/img/blockly/email.jpg',
                    width: 20,
                    height: 20,
                    alt: 'Email',
                },
            ],
            inputsInline: true,
            colour: '#64a0d4',
            previousStatement: 'Action',
            nextStatement: 'Action',
            tooltip: 'Sends email.',
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['customized_send_notification'] = {
    init: function () {
        this.jsonInit({
            message0: '%3 Send notification by title: %1 and message: %2',
            args0: [
                {
                    type: 'input_value',
                    name: 'title',
                },
                {
                    type: 'input_value',
                    name: 'message',
                },
                {
                    type: 'field_image',
                    src: '/img/blockly/notif.jpg',
                    width: 20,
                    height: 20,
                    alt: 'Notification',
                },
            ],
            inputsInline: true,
            colour: '#64a0d4',
            previousStatement: 'Action',
            nextStatement: 'Action',
            tooltip: 'Sends notification.',
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

// Define custom blocks for Wait category
Blockly.Blocks['wait_sec'] = {
    init: function () {
        this.jsonInit({
            message0: 'Wait %1 seconds',
            args0: [
                {
                    type: 'field_number',
                    name: 'seconds',
                    value: 1,
                    min: 0,
                    precision: 1,
                },
            ],
            inputsInline: true,
            previousStatement: 'Action',
            nextStatement: 'Action',
            colour: 450,
            tooltip: 'Wait for a specified number of seconds.',
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['wait_min'] = {
    init: function () {
        this.jsonInit({
            message0: 'Wait %1 minutes',
            args0: [
                {
                    type: 'field_number',
                    name: 'minutes',
                    value: 1,
                    min: 0,
                    precision: 1,
                },
            ],
            inputsInline: true,
            previousStatement: 'Action',
            nextStatement: 'Action',
            colour: 450,
            tooltip: 'Wait for a specified number of minutes.',
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['wait_hour'] = {
    init: function () {
        this.jsonInit({
            message0: 'Wait %1 hours',
            args0: [
                {
                    type: 'field_number',
                    name: 'hours',
                    value: 1,
                    min: 0,
                    precision: 1,
                },
            ],
            inputsInline: true,
            previousStatement: 'Action',
            nextStatement: 'Action',
            colour: 450,
            tooltip: 'Wait for a specified number of hours.',
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

Blockly.Blocks['wait_day'] = {
    init: function () {
        this.jsonInit({
            message0: 'Wait %1 days',
            args0: [
                {
                    type: 'field_number',
                    name: 'days',
                    value: 1,
                    min: 0,
                    precision: 1,
                },
            ],
            inputsInline: true,
            previousStatement: 'Action',
            nextStatement: 'Action',
            colour: 450,
            tooltip: 'Wait for a specified number of days.',
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

/* javascriptGenerator.forBlock['customized_multi_sensor_temperature_humidity'] =
    function (block, generator) {
        var dropdownDevice = block.getFieldValue('device')
        var dropdownSensor = block.getFieldValue('sensor')

        const code = `${dropdownDevice}.${dropdownSensor}`
        return [code, generator.ORDER_NONE]
    }

javascriptGenerator.forBlock['customized_multi_sensor_door'] = function (
    block,
    generator
) {
    const dropdownDevice = block.getFieldValue('device')
    const dropdownSensor = block.getFieldValue('sensor')

    const code = `${dropdownDevice}.${dropdownSensor}`
    return [code, generator.ORDER_NONE]
}

// Generator for customized_multi_sensor_motion
javascriptGenerator.forBlock['customized_multi_sensor_motion'] = function (
    block,
    generator
) {
    const dropdownDevice = block.getFieldValue('device')
    const dropdownSensor = block.getFieldValue('sensor')

    const code = `${dropdownDevice}.${dropdownSensor}`
    return [code, generator.ORDER_NONE]
}

// Generator for customized_multi_sensor_button
javascriptGenerator.forBlock['customized_multi_sensor_button'] = function (
    block,
    generator
) {
    const dropdownDevice = block.getFieldValue('device')
    const dropdownSensor = block.getFieldValue('sensor')

    const code = `${dropdownDevice}.BUTTON == '${dropdownSensor}'`
    return [code, generator.ORDER_NONE]
}

// Generator for customized_thermometer_hygrometer
javascriptGenerator.forBlock['customized_thermometer_hygrometer'] = function (
    block,
    generator
) {
    const dropdownDevice = block.getFieldValue('device')
    const dropdownSensor = block.getFieldValue('sensor')

    const code = `${dropdownDevice}.${dropdownSensor}`
    return [code, generator.ORDER_NONE]
}

javascriptGenerator.forBlock['customized_device_info'] = function (
    block,
    generator
) {
    const dropdownDevice = block.getFieldValue('device')
    const dropdownSensor = block.getFieldValue('sensor')

    const code = `${dropdownDevice}.${dropdownSensor}`
    return [code, generator.ORDER_NONE]
}

javascriptGenerator.forBlock['customized_door_sensor'] = function (
    block,
    generator
) {
    const dropdownDevice = block.getFieldValue('device')
    const dropdownSensor = block.getFieldValue('sensor')

    const code = `${dropdownDevice}.${dropdownSensor}`
    return [code, generator.ORDER_NONE]
}

// Generator for customized_motion_detector
javascriptGenerator.forBlock['customized_motion_detector'] = function (
    block,
    generator
) {
    const dropdownDevice = block.getFieldValue('device')
    const dropdownSensor = block.getFieldValue('sensor')

    const code = `${dropdownDevice}.${dropdownSensor}`
    return [code, generator.ORDER_NONE]
}

// Generator for customized_smart_button
javascriptGenerator.forBlock['customized_smart_button'] = function (
    block,
    generator
) {
    const dropdownDevice = block.getFieldValue('device')
    const dropdownSensor = block.getFieldValue('sensor')

    const code = `${dropdownDevice}.${dropdownSensor}`
    return [code, generator.ORDER_NONE]
} */

const deviceBlocks = [
    'customized_multi_sensor_door',
    'customized_multi_sensor_motion',
    'customized_multi_sensor_button',
    'customized_smart_button',
    'customized_door_sensor',
    'customized_motion_detector',
    'customized_thermometer_hygrometer',
    'customized_device_info',
    'customized_multi_sensor_temperature_humidity',
]

deviceBlocks.forEach((blockName) => {
    javascriptGenerator.forBlock[blockName] = function (block, generator) {
        const dropdownDevice = block.getFieldValue('device')
        const dropdownSensor = block.getFieldValue('sensor')
        var inputBlock = javascriptGenerator.valueToCode(
            block,
            'inputs',
            javascriptGenerator.ORDER_NONE
        )
        const code = `${dropdownDevice}.${dropdownSensor}${
            (inputBlock && ` + ${inputBlock}`) || ''
        }`
        return [code, generator.ORDER_NONE]
    }
})

// Generator for customized_send_notification
javascriptGenerator.forBlock['customized_send_notification'] = function (
    block,
    generator
) {
    var input_title =
        javascriptGenerator.valueToCode(
            block,
            'title',
            javascriptGenerator.ORDER_NONE
        ) || `""`
    var input_message =
        javascriptGenerator.valueToCode(
            block,
            'message',
            javascriptGenerator.ORDER_NONE
        ) || `""`
    return `customizedMessage.sendNotification({ title: ${input_title}, message: ${input_message} });`
}

javascriptGenerator['customized_send_email'] = function (block) {
    var input_subject =
        javascriptGenerator.valueToCode(
            block,
            'subject',
            javascriptGenerator.ORDER_NONE
        ) || `""`
    var input_body =
        javascriptGenerator.valueToCode(
            block,
            'body',
            javascriptGenerator.ORDER_NONE
        ) || `""`
    var code = `customizedMessage.sendMail({ subject: ${input_subject}, body: ${input_body} });\n`
    return code
}

// Text Block Definition
Blockly.Blocks['custom_text'] = {
    init: function () {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField(new Blockly.FieldTextInput('default'), 'TEXT')
        this.setOutput(true, 'String')
        this.setColour(160)
        this.setTooltip('')
        this.setHelpUrl('')
    },
}

javascriptGenerator['custom_text'] = function (block) {
    var code = "'" + block.getFieldValue('TEXT') + "'"
    var additionalText = javascriptGenerator.valueToCode(
        block,
        'TEXT',
        javascriptGenerator.ORDER_NONE
    )
    if (additionalText) {
        code += ' + ' + additionalText
    }
    return [code, javascriptGenerator.ORDER_NONE]
}

javascriptGenerator.forBlock['wait_sec'] = function (block, generator) {
    var seconds = block.getFieldValue('seconds')
    return `var waitTill = new Date(new Date().getTime() + ${
        seconds * 1000
    }); while(waitTill > new Date()){};`
}

javascriptGenerator.forBlock['wait_min'] = function (block, generator) {
    var min = block.getFieldValue('minutes')
    return `var waitTill = new Date(new Date().getTime() + ${
        min * 60 * 1000
    }); while(waitTill > new Date()){};`
}

javascriptGenerator.forBlock['wait_hour'] = function (block, generator) {
    var hour = block.getFieldValue('hours')
    return `var waitTill = new Date(new Date().getTime() + ${
        hour * 60 * 60 * 1000
    }); while(waitTill > new Date()){};`
}

javascriptGenerator.forBlock['wait_day'] = function (block, generator) {
    var day = block.getFieldValue('days')
    return `var waitTill = new Date(new Date().getTime() + ${
        day * 24 * 60 * 60 * 1000
    }); while(waitTill > new Date()){};`
}

Blockly.Blocks['to_string'] = {
    init: function () {
        this.appendValueInput('VALUE').setCheck(null).appendField('to string')
        this.setOutput(true, 'String')
        this.setColour(160)
        this.setTooltip('Converts the input value to a string.')
        this.setHelpUrl('')
    },
}

javascriptGenerator.forBlock['to_string'] = function (block) {
    var value =
        javascriptGenerator.valueToCode(
            block,
            'VALUE',
            javascriptGenerator.ORDER_NONE
        ) || '""'
    var code = 'String(' + value + ')'
    return [code, javascriptGenerator.ORDER_FUNCTION_CALL]
}

Blockly.Blocks['to_number'] = {
    init: function () {
        this.appendValueInput('VALUE').setCheck(null).appendField('to number')
        this.setOutput(true, 'Number')
        this.setColour(230)
        this.setTooltip('Converts the input value to a number.')
        this.setHelpUrl('')
    },
}

javascriptGenerator.forBlock['to_number'] = function (block) {
    var value =
        javascriptGenerator.valueToCode(
            block,
            'VALUE',
            javascriptGenerator.ORDER_NONE
        ) || '0'
    var code = 'Number(' + value + ')'
    return [code, javascriptGenerator.ORDER_FUNCTION_CALL]
}

Blockly.Blocks['door_options'] = {
    init: function () {
        this.jsonInit({
            type: 'door_options',
            message0: 'door %1 %2',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'DROPDOWN',
                    options: [
                        ['open', 'open'],
                        ['close', 'close'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 350,
            tooltip: "Checks Multi Sensor's Door.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

javascriptGenerator.forBlock['door_options'] = function (block) {
    var dropdown_value = block.getFieldValue('DROPDOWN')
    var value =
        javascriptGenerator.valueToCode(
            block,
            'VALUE',
            javascriptGenerator.ORDER_NONE
        ) || ''
    var code = '"' + dropdown_value + '"' + (value ? ` + ${value}` : '')
    return [code, javascriptGenerator.ORDER_FUNCTION_CALL]
}

Blockly.Blocks['movement_options'] = {
    init: function () {
        this.jsonInit({
            type: 'movement_options',
            message0: 'motion %1 %2',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'DROPDOWN',
                    options: [
                        ['detected', 'detected'],
                        ['Scanning', 'scanning...'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 350,
            tooltip: "Checks Multi Sensor's Motion.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

javascriptGenerator.forBlock['movement_options'] = function (block) {
    var dropdown_value = block.getFieldValue('DROPDOWN')
    var value =
        javascriptGenerator.valueToCode(
            block,
            'VALUE',
            javascriptGenerator.ORDER_NONE
        ) || ''
    var code = '"' + dropdown_value + '"' + (value ? ` + ${value}` : '')
    return [code, javascriptGenerator.ORDER_FUNCTION_CALL]
}

Blockly.Blocks['button_options'] = {
    init: function () {
        this.jsonInit({
            type: 'button_options',
            message0: 'button %1 %2',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'DROPDOWN',
                    options: [
                        ['pressed', 'pressed'],
                        ['not pressed', 'not pressed'],
                        // Add more options as needed
                    ],
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
            ],
            inputsInline: false,
            output: null,
            colour: 350,
            tooltip: "Checks Multi Sensor's Motion.",
            helpUrl: 'https://example.com', // Replace with your help URL
        })
    },
}

javascriptGenerator.forBlock['button_options'] = function (block) {
    var dropdown_value = block.getFieldValue('DROPDOWN')
    var value =
        javascriptGenerator.valueToCode(
            block,
            'VALUE',
            javascriptGenerator.ORDER_NONE
        ) || ''
    var code = '"' + dropdown_value + '"' + (value ? ` + ${value}` : '')
    return [code, javascriptGenerator.ORDER_FUNCTION_CALL]
}
