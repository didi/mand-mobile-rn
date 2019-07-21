//
//  MDAlbumPickerController.m
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import "MDAlbumPickerController.h"
#import "MDImagePickerController.h"
#import "MDPhotoPickerController.h"
#import "MDAlbumCell.h"
#import "MDImageManager.h"
#import "MDCommonTools.h"
#import "UIView+MDExtension.h"

@interface MDAlbumPickerController ()<UITableViewDataSource,UITableViewDelegate>

@property (nonatomic, strong) MDImagePickerController *imagePicker;
@property (nonatomic, strong) UITableView    *tableView;
@property (nonatomic, strong) NSMutableArray *albums;
@property (nonatomic, assign) BOOL isFirstAppear;

@end

@implementation MDAlbumPickerController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.imagePicker = (MDImagePickerController *)self.navigationController;
    self.isFirstAppear = YES;
    if ([PHPhotoLibrary authorizationStatus] == 0) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(configTableView) name:AuthorizationComplettion object:nil];
    }
    [self initNavigationView];
    [self initTableView];
}

- (void)initNavigationView {
    self.view.backgroundColor = [UIColor whiteColor];
    self.navigationItem.title = Theme.photosTitle;
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:Theme.cancelBtnTitle style:UIBarButtonItemStylePlain target:_imagePicker action:@selector(cancelButtonClick)];
    if (self.isFirstAppear && !_imagePicker.navLeftBarButtonSettingBlock) {
        self.navigationItem.backBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:Theme.backBarBtnTitle style:UIBarButtonItemStylePlain target:nil action:nil];
    }
}

- (void)initTableView {
    self.tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStylePlain];
    self.tableView.rowHeight = 72;
    self.tableView.dataSource = self;
    self.tableView.delegate = self;
    self.tableView.tableFooterView = [[UIView alloc] init];
    [self.tableView registerClass:[MDAlbumCell class] forCellReuseIdentifier:@"MDAlbumCell"];
    [self.tableView setSeparatorInset:UIEdgeInsetsMake(0, 0, 0, 0)];
    [self.view addSubview:self.tableView];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [_imagePicker hideProgressHUD];
    [self configTableView];
}

- (void)configTableView {
    if (![[MDImageManager manager] authorizationStatusAuthorized]) {
        return;
    }
    if (self.isFirstAppear) {
        [_imagePicker showProgressHUD];
    }
    
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
        [[MDImageManager manager] getAllAlbums:!self.isFirstAppear completion:^(NSArray<MDAlbumModel *> *models) {
            dispatch_async(dispatch_get_main_queue(), ^{
                [_imagePicker hideProgressHUD];
                self.albums = [NSMutableArray arrayWithArray:models];
                for (MDAlbumModel *albumModel in self.albums) {
                    albumModel.selectedModels = _imagePicker.selectedModels;
                }
                if (self.isFirstAppear) {
                    self.isFirstAppear = NO;
                }
                [self.tableView reloadData];
            });
        }];
    });
}

#pragma mark - Layout

- (void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
    [self  layoutTableView];
}

- (void)layoutTableView {
    CGFloat top = 0;
    CGFloat height = 0;
    CGFloat naviBarHeight = self.navigationController.navigationBar.md_height;
    BOOL isStatusBarHidden = [UIApplication sharedApplication].isStatusBarHidden;
    if (self.navigationController.navigationBar.isTranslucent) {
        top = naviBarHeight;
        if (!isStatusBarHidden) {
            top += [MDCommonTools md_statusBarHeight];
        }
        height = self.view.md_height - top;
    } else {
        height = self.view.md_height;
    }
    self.tableView.frame = CGRectMake(20, top, self.view.md_width - 40, height);
}

#pragma mark - DataSource & Delegate

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.albums.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    MDAlbumCell *cell = [tableView dequeueReusableCellWithIdentifier:@"MDAlbumCell"];
    if (indexPath.row < _albums.count) {
        cell.model = _albums[indexPath.row];
    }
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    MDPhotoPickerController *photoPickerVC = [[MDPhotoPickerController alloc] init];
    if (indexPath.row < _albums.count) {
        MDAlbumModel *model = _albums[indexPath.row];
        photoPickerVC.albumModel = model;
    }
    [self.navigationController pushViewController:photoPickerVC animated:YES];
    [tableView deselectRowAtIndexPath:indexPath animated:NO];
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    NSLog(@"%@-----dealloc",NSStringFromClass(self.class));
}


@end
