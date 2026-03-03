import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type PDFMetadata, UserRole } from "../backend";
import type { ExternalBlob } from "../backend";
import { useActor } from "./useActor";

export function useGetAllPDFs() {
  const { actor, isFetching } = useActor();
  return useQuery<PDFMetadata[]>({
    queryKey: ["pdfs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPDFs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["userRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPDF() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      blob,
    }: {
      title: string;
      blob: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addPDF(title, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pdfs"] });
    },
  });
}

export function useDeletePDF() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePDF(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pdfs"] });
    },
  });
}
