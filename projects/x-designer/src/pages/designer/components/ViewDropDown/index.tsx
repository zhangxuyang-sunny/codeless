import { Dropdown, Menu, Button } from "@arco-design/web-react";
import { IconDown } from "@arco-design/web-react/icon";
import useViewData from "src/apiHooks/useViewList";
import { useViewState } from "src/stores/viewState";

const ViewDropDown: React.FC = () => {
  const { viewState, setViewData } = useViewState();

  const { data } = useViewData(firstData => {
    setViewData(firstData);
  });

  const dropList = (
    <Menu>
      {data.map(d => {
        return (
          <Menu.Item
            onClick={() => {
              setViewData(d);
            }}
            key={d.id}
          >
            {d.title}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <div className="dropdown-demo">
      <span> {viewState?.title} </span>
      <Dropdown droplist={dropList} position="br" trigger="click">
        <Button className="button" size="small" type="text" shape="circle">
          <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
};
export default ViewDropDown;
