interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="fixed top-0 right-0 h-screen w-1/2 lg:w-1/3 overflow-auto border-l">
      {children}
    </div>
  );
};

export default Sidebar;
