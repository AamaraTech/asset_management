import { MenuItem } from "primeng/api";

export class PrimeNgUtil {
  protected onClickHelpDesk() {
    const externalUrl = 'https://sanaditechnologies.freshdesk.com/support/home';
    window.open(externalUrl, '_blank');
  }

  protected onClickRemoteDesk() {
    const externalUrl = 'https://remotedesktop.google.com/support/';
    window.open(externalUrl, '_blank');
  }

  getSpeedDialConfig():MenuItem[]{
    return [
      {
        tooltipOptions: {
          tooltipLabel: 'Help Desk!',
        },
        icon: 'pi pi-comments',
        command: () => {
          this.onClickHelpDesk();
        },
        
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Remote Desk!',
        },
        icon: 'pi pi-desktop',
        command: () => {
          this.onClickRemoteDesk();
        },
      },
    ];
  }

}
