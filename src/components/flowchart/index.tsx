import React from 'react';
import { FlowchartViewer } from './flowchart-viewer';
import {
  importServerFlow,
  exportServerFlow,
  attachKvmFlow,
  attachConsoleFlow,
  rebootServerFlow,
  serverAssistanceFlow,
} from './data/data-center-flows';
import {
  ipAllocationFlow,
  ipReclaimFlow,
  networkTroubleshootingFlow,
  switchOutageFlow,
  leasedLineIssuesFlow,
  ddosMitigationFlow,
  ipBlacklistFlow,
  abuseMalwareFlow,
} from './data/network-flows';
import { licenseRegistrationFlow } from './data/license-flows';
import {
  deployCloudfone4uFlow,
  deployVirtualPbxFlow,
  handoverContactCenterFlow,
  cancelContactCenterFlow,
  suspendContactCenterFlow,
  cancelAddonFlow,
} from './data/voice-flows';
import type { FlowchartData } from './types';

const flowRegistry: Record<string, FlowchartData> = {
  // Data Center
  'import-server': importServerFlow,
  'dc-import-server': importServerFlow,
  'export-server': exportServerFlow,
  'dc-export-server': exportServerFlow,
  'attach-kvm': attachKvmFlow,
  'dc-attach-kvm': attachKvmFlow,
  'attach-console': attachConsoleFlow,
  'dc-attach-console': attachConsoleFlow,
  'reboot-server': rebootServerFlow,
  'dc-reboot-server': rebootServerFlow,
  'server-assistance': serverAssistanceFlow,
  'dc-server-assistance': serverAssistanceFlow,

  // Network
  'ip-allocation': ipAllocationFlow,
  'net-ip-allocation': ipAllocationFlow,
  'ip-reclaim': ipReclaimFlow,
  'net-ip-reclaim': ipReclaimFlow,
  'network-troubleshooting': networkTroubleshootingFlow,
  'net-troubleshooting': networkTroubleshootingFlow,
  'switch-outage': switchOutageFlow,
  'net-switch-outage': switchOutageFlow,
  'leased-line-issues': leasedLineIssuesFlow,
  'net-leased-line-issues': leasedLineIssuesFlow,
  'ddos-mitigation': ddosMitigationFlow,
  'net-ddos-mitigation': ddosMitigationFlow,
  'ip-blacklist': ipBlacklistFlow,
  'net-ip-blacklist': ipBlacklistFlow,
  'abuse-malware': abuseMalwareFlow,
  'net-abuse-malware': abuseMalwareFlow,

  // Software License
  'license-registration': licenseRegistrationFlow,
  'lic-registration': licenseRegistrationFlow,

  // AI Contact Center / Voice
  'deploy-cloudfone-4u': deployCloudfone4uFlow,
  'voice-deploy-cloudfone-4u': deployCloudfone4uFlow,
  'deploy-virtual-pbx': deployVirtualPbxFlow,
  'voice-deploy-virtual-pbx': deployVirtualPbxFlow,
  'deploy-cloudfone-standard': deployVirtualPbxFlow,
  'handover-contact-center': handoverContactCenterFlow,
  'voice-handover-contact-center': handoverContactCenterFlow,
  'handover-service': handoverContactCenterFlow,
  'cancel-contact-center': cancelContactCenterFlow,
  'voice-cancel-contact-center': cancelContactCenterFlow,
  'cancel-service': cancelContactCenterFlow,
  'suspend-contact-center': suspendContactCenterFlow,
  'voice-suspend-contact-center': suspendContactCenterFlow,
  'suspend-service': suspendContactCenterFlow,
  'cancel-addon': cancelAddonFlow,
  'voice-cancel-addon': cancelAddonFlow,
};

interface ProcessFlowchartProps {
  flowId?: string;
  flow?: FlowchartData;
}

export function ProcessFlowchart({ flowId, flow }: ProcessFlowchartProps) {
  const data = flow || (flowId ? flowRegistry[flowId] : undefined);

  if (!data) {
    return (
      <div className="my-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-600 dark:text-red-400">
        Không tìm thấy dữ liệu lưu đồ cho mã: <code>{flowId}</code>
      </div>
    );
  }

  return <FlowchartViewer data={data} />;
}

export * from './types';
export { FlowchartViewer } from './flowchart-viewer';
