# # import boto3
# from django.conf import settings
#
#
#
#
# class Route53Service:
#
#     # def __init__(self) -> None:
#     #     self.route53 = boto3.client(service_name='route53',
#     #                                   region_name='us-east-1',
#     #                                   use_ssl=True,
#     #                                   aws_access_key_id=settings.AWS_ACCESS_KEY,
#     #                                   aws_secret_access_key=settings.AWS_SCERET_KEY)
#
#     def create_sub_domain(self,sub_domain_name):
#         """
#         Function is used to create subdomain in AWS Route 53 for new registration of client
#
#         @params : sub_domain_name
#         """
#         try:
#             response = self.route53.change_resource_record_sets(
#                 ChangeBatch={
#                     'Changes': [
#                         {
#                             'Action': 'CREATE',
#                             'ResourceRecordSet': {
#                                 'Name': sub_domain_name + '.craftyouridea.com',
#                                 'ResourceRecords': [
#                                     {
#                                         # actual ip of demo server
#                                         'Value': '54.203.139.192',
#                                     },
#                                 ],
#                                 'TTL': 60,
#                                 'Type': 'A',
#                             },
#                         },
#                     ],
#                     'Comment': 'Web Server',
#                 },
#                 HostedZoneId='Z00975981FGC01VUKU4FY', # actual hosted zone id
#             )
#             return response
#         except Exception as e:
#             raise RuntimeError("Unable create DNS record" + str(e))
#
#
