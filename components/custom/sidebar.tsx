interface SidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const SidebarStyles = {
  visible:
    "bg-white fixed top-0 right-0 h-[calc(100vh+10px)] w-1/2 lg:w-1/3 overflow-auto border-l overscroll-contain",
  hidden:
    "bg-white fixed top-0 right-0 h-screen w-0 overflow-hidden overscroll-contain",
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, children }) => {
  return (
    <div className={isOpen ? SidebarStyles.visible : SidebarStyles.hidden}>
      {children}
    </div>
  );
};

export default Sidebar;
