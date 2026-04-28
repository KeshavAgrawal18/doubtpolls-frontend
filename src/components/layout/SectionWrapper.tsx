interface Props {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<Props> = ({ title, action, children }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {action}
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default SectionWrapper;
