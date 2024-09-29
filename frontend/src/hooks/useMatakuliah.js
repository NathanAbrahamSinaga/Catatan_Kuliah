import { useSelector, useDispatch } from 'react-redux'
import { fetchMatakuliah } from '../redux/matakuliahSlice'

export function useMatakuliah() {
  const dispatch = useDispatch()
  const { matakuliah, status, error } = useSelector((state) => state.matakuliah)

  const loadMatakuliah = () => {
    if (status === 'idle') {
      dispatch(fetchMatakuliah())
    }
  }

  return { matakuliah, status, error, loadMatakuliah }
}