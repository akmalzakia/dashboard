import { Status } from "../utils/enums";

export const chartsData = {
  January: {
    unresolved: 10,
    resolved: 20,
    open: 14,
    onhold: 5,
  },
  February: {
    unresolved: 9,
    resolved: 21,
    open: 13,
    onhold: 6,
  },
  March: {
    unresolved: 6,
    resolved: 29,
    open: 6,
    onhold: 10,
  },
  April: {
    unresolved: 12,
    resolved: 25,
    open: 10,
    onhold: 12,
  },
  May: {
    unresolved: 6,
    resolved: 27,
    open: 11,
    onhold: 2,
  },
  June: {
    unresolved: 16,
    resolved: 20,
    open: 10,
    onhold: 5,
  },
  July: {
    unresolved: 11,
    resolved: 19,
    open: 8,
    onhold: 5,
  },
  August: {
    unresolved: 3,
    resolved: 30,
    open: 3,
    onhold: 1,
  },
  September: {
    unresolved: 10,
    resolved: 20,
    open: 10,
    onhold: 2,
  },
  October: {
    unresolved: 5,
    resolved: 25,
    open: 5,
    onhold: 5,
  },
  November: {
    unresolved: 8,
    resolved: 26,
    open: 3,
    onhold: 5,
  },
  Desember: {
    unresolved: 3,
    resolved: 30,
    open: 3,
    onhold: 1,
  },
};

export const chartData = {
  unresolved: [10, 9, 6, 12, 6, 16, 11, 3, 10, 5, 8, 3],
  resolved: [20, 21, 29, 25, 27, 20, 19, 30, 20, 25, 26, 30],
  open: [14, 13, 6, 10, 11, 10, 8, 3, 10, 5, 3, 3],
  onHold: [5, 6, 10, 12, 2, 5, 5, 1, 2, 5, 5, 1]
}

export interface LatestActivityType {
  id: string,
  timestamp: number,
  title: string,
  modifiedBy: {
    name: string,
  },
  changes?: {
    status?: {
      from: Status,
      to: Status
    }
  }
}

export const latestActivityData: LatestActivityType[] = [
  {
    id: "ABCD-1001",
    timestamp: 1721652690226,
    title: "Do something new",
    modifiedBy: {
      name: "Akmal Zaki",
    },
    changes: {
      status: {
        from: Status.OnHold,
        to: Status.Resolved
      }
    }
  },
  {
    id: "ABCD-1000",
    timestamp: 1721566233602,
    title: "Do something boring",
    modifiedBy: {
      name: "Akmal Zaki",
    },
    changes: {
      status: {
        from: Status.OnProgress,
        to: Status.Resolved
      }
    }
  },
  {
    id: "ABCD-999",
    timestamp: 1721479833602,
    title: "Do something interesting",
    modifiedBy: {
      name: "Akmal Zaki",
    },
    changes: {
      status: {
        from: Status.OnProgress,
        to: Status.Open
      }
    }
  },
  {
    id: "ABCD-998",
    timestamp: 1721393433602,
    title: "Do something",
    modifiedBy: {
      name: "Akmal Zaki",
    },
    changes: {
      status: {
        from: Status.Open,
        to: Status.OnHold
      }
    }
  }
]

export const unresolvedTicketsData = [
  {
    id: 'AAA-111',
    timestamp: 1721652690226,
    title: 'Do anything great',
    createdBy: {
      name: 'Akmal Zaki',
      image: ''
    }
  },
  {
    id: 'AAA-110',
    timestamp: 1721566233602,
    title: 'Do whatever you like',
    createdBy: {
      name: 'Akmal Zaki',
      image: ''
    }
  },
  {
    id: 'AAA-109',
    timestamp: 1721479833602,
    title: 'Do not forget',
    createdBy: {
      name: 'Akmal Zaki',
      image: ''
    }
  },
  {
    id: 'AAA-108',
    timestamp: 1721393433602,
    title: 'Do everything',
    createdBy: {
      name: 'Akmal Zaki',
      image: ''
    }
  },
]

export const tasksData = [
  {
    id: 'ASDF-1020',
    timestamp: 1721566233602,
    title: 'Do something special',
    createdBy: {
      name: 'Akmal Zaki',
      image: ''
    },
    status: Status.Open
  },
  {
    id: 'ASDF-1019',
    timestamp: 1721652690226,
    title: 'Do something meaningful',
    createdBy: {
      name: 'Akmal Zaki',
      image: ''
    },
    status: Status.Open
  },
  {
    id: 'ASDF-1018',
    timestamp: 1721393433602,
    title: 'Do something innovative',
    createdBy: {
      name: 'Akmal Zaki',
      image: ''
    },
    status: Status.Open
  }
]