from setuptools import setup

with open('README.rst', 'r') as fh:
    long_description = fh.read()

setup(
    name='social-analyzer',
    description="API, CLI & Web App for analyzing & finding a person's profile across 300+ social media websites (Detections are updated regularly)",
    long_description=long_description,
    version='0.45',
    packages=['social-analyzer'],
    include_package_data=True,
    scripts=['social-analyzer/social-analyzer'],
    package_data={'social-analyzer': ['data/*']},
    python_requires='>=3',
)
