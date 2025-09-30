import { useIsMounted } from '@zigurous/forge-react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'; // prettier-ignore
import type { GridMasterReward, GridMasterTask } from '../types';

interface GridMasterContextData {
  tasks: GridMasterTask[];
  rewards: GridMasterReward[];
  selectedTask: GridMasterTask | null;
  previousTask: GridMasterTask | null;
  getTaskById: (id: string) => GridMasterTask | undefined;
  getRewardById: (id: string) => GridMasterReward | undefined;
  viewTask: (id: string) => void;
  closeTask: () => void;
}

const defaultData: GridMasterContextData = {
  tasks: [],
  rewards: [],
  selectedTask: null,
  previousTask: null,
  getTaskById: () => undefined,
  getRewardById: () => undefined,
  viewTask: () => undefined,
  closeTask: () => undefined,
};

const GridMasterContext = createContext<GridMasterContextData>(defaultData);
export default GridMasterContext;

export function useGridMasterContext(): GridMasterContextData {
  return useContext<GridMasterContextData>(GridMasterContext);
}

export function GridMasterContextProvider({
  children,
}: React.PropsWithChildren) {
  const data = useStaticQuery<GridMasterQueryData>(dataQuery);
  const mounted = useIsMounted();
  const [task, setTask] = useState<{
    selected: GridMasterTask | null;
    previous: GridMasterTask | null;
  }>({ selected: null, previous: null });

  const getTaskById = useCallback((id: string) => {
    id = id.replace('task=', '');
    return data.tasks.nodes.find(task => task.id === id);
  }, []);

  const getRewardById = useCallback((id: string) => {
    id = id.replace('reward=', '');
    return data.rewards.nodes.find(task => task.id === id);
  }, []);

  const viewTask = useCallback(
    (id: string) => {
      setTask(state => ({
        selected: getTaskById(id) || null,
        previous: state.selected,
      }));
    },
    [getTaskById],
  );

  const closeTask = useCallback(
    () => setTask(state => ({ selected: null, previous: state.selected })),
    [],
  );

  useEffect(() => {
    if (mounted) {
      const query = location.search.replace('?task=', '');
      setTask({ selected: getTaskById(query) || null, previous: null });
    }
  }, [mounted]);

  useEffect(() => {
    if (task.selected) {
      navigate(`?task=${task.selected.id}`, { replace: true });
    } else if (mounted) {
      navigate(`/grid-master`, { replace: true });
    }
  }, [task.selected]);

  return (
    <GridMasterContext.Provider
      value={{
        tasks: data.tasks.nodes,
        rewards: data.rewards.nodes,
        selectedTask: task.selected,
        previousTask: task.previous,
        getTaskById,
        getRewardById,
        viewTask,
        closeTask,
      }}
    >
      {children}
    </GridMasterContext.Provider>
  );
}

interface GridMasterQueryData {
  tasks: { nodes: GridMasterTask[] };
  rewards: { nodes: GridMasterReward[] };
}

const dataQuery = graphql`
  query GridMasterQuery {
    tasks: allGridMasterTasksJson {
      nodes {
        id: jsonId
        icon
        title
      }
    }
    rewards: allGridMasterRewardsJson {
      nodes {
        id: jsonId
        icon
        title
      }
    }
  }
`;
