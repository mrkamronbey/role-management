import { Col, Flex, Row, Typography } from 'antd'
import { useCurrentUser } from '@/entities/session'
import { ROLES } from '@/shared/config'
import { LogoutButton } from '@/features/auth/logout'
import { PageCard } from '@/shared/ui'
import { ProfileAccess } from './ProfileAccess'
import { ProfileHero } from './ProfileHero'
import { ProfileInfo } from './ProfileInfo'
import { ProfileRequests } from './ProfileRequests'

export const ProfilePage = () => {
  const user = useCurrentUser()

  if (!user) {
    return null
  }

  return (
    <PageCard
      filters={
        <Flex justify="space-between" align="center" gap={12}>
          <Typography.Text type="secondary">
            Shaxsiy ma'lumotlaringiz va tizimdagi ruxsatlaringiz
          </Typography.Text>
          <LogoutButton danger />
        </Flex>
      }
    >
      <div className="flex flex-col gap-4">
        <ProfileHero user={user} />
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <ProfileInfo user={user} />
          </Col>
          <Col xs={24} lg={12}>
            <ProfileAccess user={user} />
          </Col>
          {!user.roles.includes(ROLES.ADMIN) && (
            <Col span={24}>
              <ProfileRequests />
            </Col>
          )}
        </Row>
      </div>
    </PageCard>
  )
}
