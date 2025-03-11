import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

const DrawerPortal = ({ children }: PortalProps) => {
  const portalRoot = document.getElementById("portal-drawer-root");

  if (!portalRoot) return null;

  return ReactDOM.createPortal(children, portalRoot);
};

export default DrawerPortal;
