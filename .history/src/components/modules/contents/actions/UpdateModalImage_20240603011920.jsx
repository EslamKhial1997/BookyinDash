import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Alert,
  AlertIcon,
  Stack,
  Textarea,
  Select,
} from "@chakra-ui/react";

import * as FiIcons from "react-icons/fi";

import theme from "@/components/global/theme";
import { getCategories } from "@/store/categories/categoriesSlice";
import { updateContent } from "@/store/content/contentSlice";
import { useParams } from "react-router-dom";

const UpdateModalImage = ({ data, onClose }) => {
  const { t } = useTranslation();
  const challenges = useSelector((state) => state.challenges);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const params = useParams();
  // useEffect(() => {
  //   dispatch(getCategories({ page: categoriesPage, search: categoriesSearch }));
  // }, [dispatch, categoriesPage, categoriesSearch]);

  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent borderRadius={2} paddingBlock={4} bg={theme.dark}>
        <form
          onSubmit={handleSubmit((values) => {
            dispatch(updateContent({ id: params.id, values }))
              .unwrap()
              .then((res) => {
                onClose();
                window.location.reload();
              })
              .catch((e) => console.log(e));
          })}
        >
          <ModalHeader color="orange" textTransform="uppercase" fontSize={22}>
            {t("general.update")}
          </ModalHeader>
          <ModalBody>
            {challenges.error && (
              <Alert status="error" variant="left-accent" marginBottom={8}>
                <AlertIcon />
                <Text>{challenges.error}</Text>
              </Alert>
            )}

            <Stack spacing={6}>
            <FormControl>
            <FormLabel
              fontWeight="bold"
              textTransform="capitalize"
              color="white"
            >
              {t("Image")}
            </FormLabel>
            <Input
              type="file"
              bg={theme.body}
              color={theme.dark}
              border="none"
              borderRadius={2}
              placeholder={t("image")}
              _placeholder={{ textTransform: "capitalize" }}
              {...register("image")}
            />
            {errors.name?.message && (
              <Text color="red.600" marginTop={2}>
                {errors.name.message}
              </Text>
            )}
          </FormControl>
 
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                rightIcon={<FiIcons.FiSave />}
                color="white"
                bg="green"
                paddingInline={4}
                paddingBlock={2}
                height="auto"
                textTransform="capitalize"
                isLoading={challenges.isLoading}
                _hover={{ background: "green" }}
              >
                {t("general.save")}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                rightIcon={<FiIcons.FiMinimize2 />}
                color="white"
                bg="red.600"
                paddingInline={4}
                paddingBlock={2}
                height="auto"
                textTransform="capitalize"
                marginInlineStart={4}
                isLoading={challenges.isLoading}
                _hover={{ background: "red.600" }}
              >
                {t("general.close")}
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModalImage;
