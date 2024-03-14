import { ViewProps } from "@/lib/types";
import { GameView } from "./gameView";
import { TeamView } from "./teamView";

function View(props: ViewProps) {

  const component = props.type === 'game' ? <GameView/> : <TeamView/>;

  return (
    <div>
      {component}
    </div>
  )
  
}