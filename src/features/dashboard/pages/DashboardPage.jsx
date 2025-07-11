import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Box,
  Typography,
  Stack,
  Pagination,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottomRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTimeRounded";
import WhatshotIcon from "@mui/icons-material/WhatshotRounded";
import BarChartIcon from "@mui/icons-material/BarChartRounded";
import PauseCircleIcon from "@mui/icons-material/PauseCircleRounded";

import PageWrapper from "@/components/layouts/pageWrapper/PageWrapper";
import PageHeader from "@/components/layouts/pageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchDashboardSummary,
  fetchNearDeadlineProjects,
  fetchPopularProjects,
} from "../DashboardSlice";
import ProjectAmountChart from "../components/ProjectAmountChart";
import PermissionGuard from "@/components/common/permissionGuard/PermissionGuard";
import { ROLES } from "@/constants/roles";
import usePermission from "@/hooks/usePermission";

import InfoCard from "../components/InfoCard";
import SectionBox from "../components/SectionBox";
import RowItem from "../components/RowItem";
import PopularRowItem from "../components/PopularRowItem";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const {
    summary,
    nearDeadline = [],
    nearDeadlineTotalCount = 0,
    popularProjects = [],
  } = useSelector((state) => state.dashboard || {});

  // 더미 데이터 포함한 안전한 summary
  const safeSummary = summary || {
    totalCount: 30, // 더미 데이터
    inProgressCount: 18,
    completedCount: 8,
    pendingCount: 4,
  };

  const [duePage, setDuePage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchNearDeadlineProjects({ page: duePage }));
  }, [dispatch, duePage]);

  useEffect(() => {
    dispatch(fetchPopularProjects());
  }, [dispatch]);

  return (
    <PageWrapper>
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        <PageHeader
          title="프로젝트 현황 대시보드"
          subtitle="전체 프로젝트의 진행 상태와 주요 데이터를 한눈에 확인하세요."
        />

        {/* 통계 카드 영역 - 4개로 변경 */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={4}
          gap={3}
          mx={4}
          sx={{
            "& > *": {
              minWidth: 0, // flex 아이템들이 적절히 축소될 수 있도록
            },
          }}
        >
          <InfoCard
            icon={<DashboardIcon />}
            label="전체 프로젝트"
            value={safeSummary.totalCount}
            color="neutral"
          />
          <InfoCard
            icon={<HourglassBottomIcon />}
            label="진행 중"
            value={safeSummary.inProgressCount}
            color="neutral"
          />
          <InfoCard
            icon={<CheckCircleIcon />}
            label="완료"
            value={safeSummary.completedCount}
            color="success"
          />
          <InfoCard
            icon={<PauseCircleIcon />}
            label="대기"
            value={safeSummary.pendingCount}
            color="neutral"
          />
        </Box>

        {/* 프로젝트 금액 차트 영역 */}
        <PermissionGuard
          allowedRoles={[ROLES.DEV_ADMIN, ROLES.CLIENT_ADMIN]}
          showNotification={false}
        >
          <Box mb={4} mx={4}>
            <SectionBox
              icon={<BarChartIcon />}
              title="프로젝트 금액 현황"
              iconColor="#22c55e"
              height={400}
            >
              <ProjectAmountChart />
            </SectionBox>
          </Box>
        </PermissionGuard>

        {/* 하단 섹션 영역 */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={4}
          gap={3}
          mx={4}
          sx={{
            "& > *": {
              minWidth: 0, // flex 아이템들이 적절히 축소될 수 있도록
            },
          }}
        >
          {/* 마감 임박 프로젝트 */}
          <Box flex={1}>
            <SectionBox
              icon={<AccessTimeIcon />}
              title="마감 임박 프로젝트"
              iconColor="#6b7280"
              height={600}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "grey.100",
                    borderRadius: 2,
                    textAlign: "center",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    D-5 이내 마감 예정
                  </Typography>
                </Box>
                
                {nearDeadline.length === 0 ? (
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        fontSize: "1rem",
                      }}
                    >
                      마감 임박 프로젝트가 없습니다
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        opacity: 0.8,
                      }}
                    >
                      모든 프로젝트가 여유롭게 진행 중입니다.
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Box sx={{ flexGrow: 1, overflowY: "auto", minHeight: 0 }}>
                      {nearDeadline.map((p) => (
                        <RowItem key={p.id} {...p} />
                      ))}
                    </Box>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <Pagination
                        count={Math.ceil(nearDeadlineTotalCount / pageSize)}
                        page={duePage}
                        onChange={(_, val) => setDuePage(val)}
                        size="small"
                        color="primary"
                      />
                    </Box>
                  </>
                )}
              </Box>
            </SectionBox>
          </Box>

          {/* 인기 프로젝트 */}
          <Box flex={1}>
            <SectionBox
              icon={<WhatshotIcon />}
              title="활발한 프로젝트 TOP 5"
              iconColor="#22c55e"
              height={600}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "success.bg",
                    borderRadius: 2,
                    textAlign: "center",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "success.main",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    게시글 활동 기준 순위
                  </Typography>
                </Box>
                
                <Box sx={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
                  {popularProjects.length === 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 500,
                          fontSize: "1rem",
                        }}
                      >
                        활동 데이터를 수집 중입니다
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          opacity: 0.8,
                        }}
                      >
                        프로젝트 활동이 증가하면 순위가 표시됩니다.
                      </Typography>
                    </Box>
                  ) : (
                    popularProjects.map((p, idx) => (
                      <PopularRowItem
                        key={p.projectId}
                        id={p.projectId}
                        rank={idx + 1}
                        title={p.projectName}
                      />
                    ))
                  )}
                </Box>
              </Box>
            </SectionBox>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  );
}
