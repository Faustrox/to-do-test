import { MedalCreateOrEditType } from './modal'

export type TodoType = {
  id?: number
  title: string
  priority: number
}

export type TodoProps = {
  title: string
  priority: number
  indexOnArray: number
  deleteTodo: (indxToDelete: number) => void
  setModalCreateOrEdit: (newMedal: MedalCreateOrEditType) => void
}
