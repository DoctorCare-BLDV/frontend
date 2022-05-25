export const OrderStatusFilter = [
  {id: 0, label: 'Đã hủy', finishedStatus: true, message: ''},
  {
    id: 1,
    label: 'Chờ xác nhận',
    finishedStatus: false,
    message:
      'Đơn hàng đang chờ được xác nhận, vui lòng đợi trong ít phút. Cảm ơn quý khách!',
  },
  {
    id: 2,
    label: 'Chờ lấy',
    finishedStatus: false,
    message: 'Đơn hàng đã được đóng gói và đang chờ lấy. Cảm ơn quý khách!',
  },
  {
    id: 3,
    label: 'Đang giao',
    finishedStatus: false,
    message:
      'Đơn hàng đang được giao, quá trình này có thể mất vài ngày. Cảm ơn quý khách!',
  },
  {
    id: 4,
    label: 'Hoàn thành',
    finishedStatus: true,
    message: 'Đơn hàng đã hoàn thành.\nCảm ơn quý khách!',
  },
  {
    id: 5,
    label: 'Thất bại',
    finishedStatus: true,
    message:
      'Đơn hàng thất bại, liên hệ admin để biết thêm thông tin. Cảm ơn quý khách!',
  },
];
