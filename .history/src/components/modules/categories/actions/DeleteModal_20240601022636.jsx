import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Flex,
  useToast
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import { deleteCategory } from '@/store/categories/categoriesSlice';

import theme from '@/components/global/theme';

const DeleteModal = ({ data, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toast = useToast({ status: "success", duration: 3000, position: "top" });
  const categories = useSelector(state => state.categories);

  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={2} padding={4} bg={theme.dark}>
          <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(deleteCategory(data)).unwrap().then(res => {
              onClose();
              window.location.reload();
            }).catch(_ => {
              onClose();
              window.location.reload();
            });
          }}>
            <ModalHeader color="orange" textTransform="uppercase" fontSize={22}>
              {t('general.delete')}
            </ModalHeader>
            <ModalBody>
              <Flex alignItems="center" justifyContent="center">
                <Text color="red" marginEnd={4}>
                  <FiIcons.FiAlertTriangle size={24} />
                </Text>
                <Text as="h3" textTransform="capitalize" fontWeight="semibold" color="white">
                  {t('general.delete_item')}
                </Text>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Flex justifyContent="flex-end">
                <Button
                  type="submit"
                  rightIcon={<FiIcons.FiSave />}
                  color="white" bg="green" paddingInline={4}
                  paddingBlock={2} height="auto" textTransform="capitalize"
                  isLoading={categories.isLoading}
                  _hover={{ background: 'green' }}
                >
                  {t('general.delete')}
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  rightIcon={<FiIcons.FiMinimize2 />}
                  color="white" bg="red.600" paddingInline={4}
                  paddingBlock={2} height="auto" textTransform="capitalize"
                  marginInlineStart={4}
                  isLoading={categories.isLoading}
                  _hover={{ background: 'red.600' }}
                >
                  {t('general.close')}
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteModal