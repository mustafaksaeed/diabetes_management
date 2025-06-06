i-06fcf2f0689eaa6da (xyz)
Open an SSH client.

Locate your private key file. The key used to launch this instance is xyz.pem

Run this command, if necessary, to ensure your key is not publicly viewable.
chmod 400 "xyz.pem"

Connect to your instance using its Public DNS:
ec2-3-35-233-122.ap-northeast-2.compute.amazonaws.com

Example:

ssh -i "xyz.pem" ubuntu@ec2-3-35-233-122.ap-northeast-2.compute.amazonaws.com
