import { THEME_ENUM } from '@/constants/theme.constant'
import {
    Direction,
    Mode,
    ColorLevel,
    NavMode,
    ControlSize,
    LayoutType,
} from '@/@types/theme'

export type nodeThemeApi = {
    logo: string
    text: string
    background: string
    box: string
    button: string
}

export type ThemeConfig = {
    themeColor: string
    themeBox: string
    themeText: string
    themeBackground: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    controlSize: ControlSize
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
}

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
    themeColor: '#ffffff',
    themeBox: '#ffffff',
    themeText: '#000000',
    themeBackground: '#ffffff',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_DARK,
    primaryColorLevel: 600,
    cardBordered: true,
    panelExpand: false,
    controlSize: 'md',
    navMode: THEME_ENUM.MODE_DARK,
    layout: {
        type: THEME_ENUM.LAYOUT_TYPE_MODERN,
        sideNavCollapse: false,
    },
}
