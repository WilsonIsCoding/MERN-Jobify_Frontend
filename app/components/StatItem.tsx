import Wrapper from "@/app/styles/StatItem";

const StatItem = ({
  count,
  title,
  icon,
  color,
  background,
}: {
  count: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  background: string;
}) => {
  return (
    <Wrapper color={color} background={background}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
