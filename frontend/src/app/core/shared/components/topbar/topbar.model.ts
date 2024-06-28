import { MenuItem } from "primeng/api";
import { ThemeConsntant } from "../../utils/theme.enum";

export class TobarModel {
    company_name: string = "";
    themeSelected : ThemeConsntant;
    themeIcon: string = 'pi-slack';
    themeTitle: string = "";//this.translate.instant('epicThemeTooltip_SC');
    fontmenulist: MenuItem[] = [];
    selectedCode: number = 1;
    langmenulist: MenuItem[] = [];
    thememenulist: MenuItem[] = [];
    scales: number[] = [12, 13, 14, 15, 16, 17, 18];
    scaleIndex: number = 2;
    appTitle: string | null = '';
    checked: boolean = false;
    isLoginPage: boolean = false;
    hidden: boolean = false;
}